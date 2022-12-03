var express = require('express');
var app = express();

const sessions = require('express-session');

const path = require('path');

var bodyParser  = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/*
    needed for the use of static files (.js and .css, as well as all the images and other things that will be called in the html files) 
    in the 'public' directory, otherwise they will not load
*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions({secret: 'secret', resave: true, saveUninitialized: true}))

require('./routes.js')(app);

//  listening on port 8080
var server = app.listen(8080, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
})