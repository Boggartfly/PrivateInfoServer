#!/usr/bin/env node
'use strict'
var striptags = require('striptags');
var memjs = require('memjs');
var memjsClient = memjs.Client.create();
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs')
var app = express();
app.use(bodyParser.json());

app.post('/', function(req, res) {
    'use strict';
    
    console.log(req.body);
    var jsonData = {"name": req.body.name,"color": req.body.color,"petName": req.body.petName};
    console.log('data saved:'+JSON.stringyfy(jsonData));
    memjsClient.set(req.body.uniqueIdKey, JSON.stringify(jsonData), {expires:600}, function(err, val){
    });
    res.sendStatus(200);

     memjsClient.get(req.body.uniqueIdKey, function(err,val) {
      console.log('key: %s,value: %s',req.body.uniqueIdKey,val);
    });   
   
    
});
app.get('/', function(req, res) {
  var id = req.param('id');
  var responseBody;
  memjsClient.get(id, function(err,val) {
      console.log('key: %s,value: %s',id,val);
      responseBody = val;
    });   
  res.send(responseBody);
});
app.listen(3000);


