var express = require('express');
var path = require('path')
var app = express();

app.use(express.static(__dirname + 'public'));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/public/index.html'));
})

var server = app.listen(5000);