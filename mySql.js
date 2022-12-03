var mysql = require('mysql'); 

const path = require('path');

var user_name;
var user_password;
var sqlQuitFlag;

var hostName = "127.0.0.1";
var userName = "root";
var databaseName = "test";
var con = mysql.createConnection({
    host: hostName,
    user: userName,
    password: "",
    database: databaseName
});

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

function databaseCheck(email) {

    con.getConnection(function(err, connection) {
        if (err) throw err;

        let userArray = email.split("@");
        let name = userArray[0];

        var checkSql = "SELECT * FROM `user` WHERE Email = '" + email + "'"

        con.query(checkSql, function (err, result) {
            connection.release();
            if (err) throw err;

            var row

            Object.keys(result).forEach(function(key) {
                row = result[key];
            });

            if (email == row.Email) {
                return true;
            } else {
                return false
            }
        })
    })
}

function login(email, password, res, req) {
    if (databaseCheck(email)) {
        req.session.login = email;
    }
}

module.exports = {databaseInsert, databaseCheck, login};