var express = require('express');
var app = express();
var mysql = require('mysql'); 
const path = require('path');
const router = express.Router()
var bodyParser  = require('body-parser');
const { connect } = require('http2');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* Variables */
var user_name;
var user_password;
var sqlInsertFlag;

/* MySql Connection Details */
var hostName = "127.0.0.1";
var userName = "root";
var databaseName = "test";
var con = mysql.createConnection({
    host: hostName,
    user: userName,
    password: "",
    database: databaseName
});

/*
    needed for the use of static files (.js and .css, as well as all the images and other things that will be called in the html files) 
    in the 'public' directory, otherwise they will not load
*/
app.use(express.static(path.join(__dirname, 'public')));

function databaseInsert(email, loginPassword, res) {

    con.connect(function(err) {
        if (err) throw err;

        console.log("Connected to database at: " + hostName);

        let userArray = email.split("@");
        let name = userArray[0];

        console.log("Insert started with input: " + email + ", " + name + ", " + loginPassword);

        var insertSql = "INSERT INTO user (userName, password, email) VALUES ('" + name + "', '" + loginPassword + "', '" + email + "')";

        con.query(insertSql, function (err, result) {
            if(err) {
                console.log("SQL INSERT ERROR");
                res.send("Create a new account?");
            } else {
                console.log("USER INSERTED");
                res.sendFile(path.join(__dirname, '/client/index.html'));
            }
        });
    });

    con.end();
}

//  router for the index file
app.route('/')
.get((req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
    console.log("/index get recieved");
})
.post((req, res) => {
    user_name = req.body.user;
    user_password = req.body.password
    console.log("User name = " + user_name);
    console.log("Password = " + user_password);
    databaseInsert(user_name, user_password, res)
    /*
    TODO:
        create old user login.

        create handler for if the username is already in use.

        if the username is new, ask the user if they would like to create a new account before actually creating it.
        
        if the username and password are both already in use
    */
    
    console.log('/index post recieved');
})
.put((req, res) => {
    console.log('/index put recieved');
})

//  listening on port 8080
var server = app.listen(8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
})