var mongodb = require('mongodb');
var express = require('express');
var app = express();
// respond with "Hello World!" on the homepage

var MongoClient = mongodb.MongoClient;
var urlm = 'mongodb://localhost:27017/js';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Content-Type', 'application/json');
  next();
});

MongoClient.connect(urlm, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //var collection = db.collection('users');
    var collection = db.collection('calendar');
    
    app.get('/', function (req, res) {
      res.send('Hello World!');
    });

    app.get('/usercontent', function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      collection.findOne({_id:new mongodb.ObjectId(req.query.iduser)},function(err, docs) {
          console.log("Printing docs from Array. count " + JSON.stringify(docs));
          res.json(docs); 
          db.close();
      });
    });

    app.get('/getsource', function (req, res) {
      res.setHeader('Content-Type', 'application/json');
      collection.findOne({_id:new mongodb.ObjectId(req.query.id)},function(err, docs) {
          console.log("Printing docs from Array. count " + JSON.stringify(docs));
          res.json(docs); 
          db.close();
      });
    });

    app.get('/update', function (req, res) {

    res.setHeader('Content-Type', 'application/json');

    collection.update({name: 'modulus user'}, {$push: {roles: "pudimzero"}}, function (err, numUpdated) {
        if (err) {
          console.log(err);
        } else if (numUpdated) {
          console.log('Updated Successfully %d document(s).', numUpdated);
        } else {
          console.log('No document found with defined "find" criteria!');
        }
        db.close();
      });
    });
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
  });
  }
});