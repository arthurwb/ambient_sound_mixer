var express = require('express');
var app = express();

const path = require('path');

const { connect } = require('http2');

var bodyParser  = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')

var databaseAlter = require('./mySql');

module.exports = function(app) {
    app.route('/')
    .get((req, res) => {
        // res.sendFile(path.join(__dirname, '/client/index.html'));
        res.locals.email = 'none';
        res.render('\index.ejs');
        console.log("index login session");
        console.log("/index get recieved");
    })
    .post((req, res) => {
        console.log("/index post recieved");
        databaseAlter.login(req.body.user, req.body.password, res, req);
        // res.sendFile(path.join(__dirname, '/client/index.html'));
        res.render('\newLogin.ejs');
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

    app.route('/newLogin')
    .get((req, res) => {
        // res.sendFile(path.join(__dirname, '/client/newLogin.html'));
        res.render('\login.ejs');
        console.log("User logged in = " + req.session.login);
        console.log("/newLogin get recieved");
    })
    .post((req, res) => {
        console.log("/newLogin post recieved");
        databaseAlter.databaseCheck(req.body.user, res, req);
    })
    .put((req, res) => {
        console.log("/newLogin put recieved");
    })
    
}