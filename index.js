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
    if(req.body.length()>1){
        console.log(req.body);
    var jsonData = {"name": req.body.name,"color": req.body.color,"petName": req.body.petName};
    console.log('data saved:'+JSON.stringyfy(jsonData));
    memjsClient.set(req.body.uniqueIdKey, JSON.stringify(jsonData), {expires:600}, function(err, val){
    });
    res.sendStatus(200);
    }
    else{
     var content ='';
     memjsClient.get(req.body.uniqueIdKey, function(err,val) {
      console.log('key: %s,value: %s',req.body.uniqueIdKey,val);
      content = val;
    });   
    var content = striptags(content);
    res.setHeader('Content-Type', 'application/json');
    res.send(content);
    }
});

app.listen(3000);


