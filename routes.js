var express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");
var app = express();

const path = require('path');

const { connect } = require('http2');

var bodyParser  = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs')

app.use(cookieParser());

app.use(session({
    secret: "key",
    saveUninitialized: true,
    resave: true
}));

var databaseAlter = require('./mySql');

module.exports = function(app) {

    //index route
    app.route('/')
    .get((req, res) => {
        res.render('\index.ejs', {user: req.session.email});
        console.log("index login session");
        console.log("/index get recieved");
    })
    .post((req, res) => {
        console.log("/index post recieved");
        databaseAlter.login(req.body.user, req.body.password, res, req);
        res.redirect('/');
        
        console.log('/index post recieved');
    })
    .put((req, res) => {
        console.log('/index put recieved');
    })

    // login route
    app.route('/login')
    .get((req, res) => {
        console.log("/login get recieved");
        res.render('\login.ejs');
        console.log("User logged in = " + req.session.email);
    })
    .post((req, res) => {
        console.log("/login post recieved");
        console.log(databaseAlter.databaseCheck(req.body.user, req.body.password, res, req));
        console.log('end of post');
    })
    .put((req, res) => {
        console.log("/login put recieved");
    })
    
}