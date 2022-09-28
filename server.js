var express = require('express');
var app = express();
const path = require('path');
const router = express.Router()
/*
    needed for the use of static files (.js and .css, as well as all the images and other things that will be called in the html files) 
    in the 'public' directory, otherwise they will not load
*/
app.use(express.static(path.join(__dirname, 'public')));

//  router for the index file
app.route('/index')
.get((req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
    console.log("/index get recieved");
})
.post((req, res) => {
    console.log('/index post recieved');
})
.put((req, res) => {
    console.log('/index put recieved');
})

//  listening on port 8081
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})