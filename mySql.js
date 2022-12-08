const { render } = require('ejs');
var mysql = require('mysql'); 
const session = require("express-session");
const cookieParser = require("cookie-parser");

const path = require('path');

var user_name;
var user_password;
var sqlQuitFlag;

var hostName = "127.0.0.1";
var userName = "root";
var databaseName = "test";

var con = mysql.createPool({
    host: hostName,
    user: userName,
    password: "",
    database: databaseName
});

function databaseInsert(email, loginPassword, res) {

    con.getConnection(function(err, connection) {
        if (err) throw err;

        console.log("Connected to database at: " + hostName);

        let userArray = email.split("@");
        let name = userArray[0];

        console.log("Insert started with input: " + email + ", " + name + ", " + loginPassword);

        var insertSql = "INSERT INTO user (userName, password, email) VALUES ('" + name + "', '" + loginPassword + "', '" + email + "')";

        con.query(insertSql, function (err, result) {
            connection.release();
            if(err) {
                console.log("SQL INSERT ERROR");
                res.sendFile(path.join(__dirname, '/client/newLogin.html'));
            } else {
                console.log("USER INSERTED");
                res.sendFile(path.join(__dirname, '/client/index.html'));
            }
        });
    });
}

function databaseCheck(email, password, res, req) {

    con.getConnection(function(err, connection) {
        if (err) throw err;

        let userArray = email.split("@");
        let name = userArray[0];

        console.log('email ' + email + ', password ' + password);
        var checkSql = "SELECT * FROM `user` WHERE Email = '" + email + "' AND Password = '" + password + "'";

        con.query(checkSql, function (err, result) {
            if (err) {
                req.session.email = 'not logged in';
                console.log('user does not exist in database');
            }
            if (result[0].Email == email && result[0].Password == password) {
                req.session.email = email;
                console.log('return true');
                res.render('\index.ejs', {user: req.session.email});
            } else {
                req.session.email = 'not logged in';
                res.render('\login.ejs', {user: req.session.email});
            }
        })
        connection.release();
    })
    console.log('end of databaseCheck');
}

function login(email, password, res, req) {
    databaseCheck(email, password, res, req);
}

module.exports = {databaseInsert, databaseCheck, login};