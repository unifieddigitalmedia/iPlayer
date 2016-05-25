'use strict';

/*
var cl = console.log;
console.log = function(){
  console.trace();
  cl.apply(console,arguments);
};
*/

var express = require('express');

var app = express();

app.use(express.static('public'));

app.use(express.static(__dirname + '/'));

app.use(express.static('bower_components'));


app.get('/', function (req, res) {

      res.sendFile(path.join(__dirname + "/index.html"));

      });


app.listen(5000, function () {

  console.log('Example app listening on port 5000!');

});



