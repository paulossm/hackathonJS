var mongodb = require('mongodb');
var express = require('express');
var app = express();
// respond with "Hello World!" on the homepage
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/old_content', function (req, res) {

res.setHeader('Content-Type', 'application/json');

var MongoClient = mongodb.MongoClient;
var urlm = 'mongodb://localhost:27017/js';

  MongoClient.connect(urlm, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', urlm);

      var collection = db.collection('users');

      collection.find({"_id": new mongodb.ObjectId(req.query.iduser)}).toArray(function (err, result) {
        if (err) {
          console.log(err);
          res.send(err);
        } else if (result.length) {
          console.log('Found:', result);
          res.json(result);
        } else {
          console.log('No document(s) found with defined "find" criteria!');
          res.send('No document(s) found with defined "find" criteria!');
        }
        db.close();
      });
    }
  });
});

app.get('/usercontent', function (req, res) {

res.setHeader('Content-Type', 'application/json');

var MongoClient = mongodb.MongoClient;
var urlm = 'mongodb://localhost:27017/js';

  MongoClient.connect(urlm, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', urlm);

      var collection = db.collection('users');

      collection.findOne({_id:new mongodb.ObjectId("559996c51c3797f810000001")},function(err, docs) {
          console.log("Printing docs from Array. count " + JSON.stringify(docs));
          res.json(docs); 
          db.close();
      });
    }
  });
});

app.get('/getsource', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  var MongoClient = mongodb.MongoClient;
  var urlm = 'mongodb://localhost:27017/js';

  MongoClient.connect(urlm, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', urlm);

      var collection = db.collection('calendar');

      collection.findOne({_id:new mongodb.ObjectId("559996c51c3797f810000001")},function(err, docs) {
      //collection.findOne({_id:new mongodb.ObjectId(req.query.id)},function(err, docs) {
          console.log("Printing docs from Array. count " + JSON.stringify(docs));
          res.json(docs); 
          db.close();
      });
    }
  });
});

app.post('/login', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  if((req.query.username=='admin') && (req.query.password=='123')){
    res.redirect('http://localhost/aaa.html');
  } else{
    res.redirect('http://localhost/erro.html');
  }
});

app.get('/up', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  var MongoClient = mongodb.MongoClient;
  var urlm = 'mongodb://localhost:27017/js';

  MongoClient.connect(urlm, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', urlm);

      var collection = db.collection('calendar');

      collection.update({_id:new mongodb.ObjectId("559996c51c3797f810000001")}, {source: JSON.parse(req.query.e) }, function (err, numUpdated) {
        if (err) {
          console.log(err);
        } else if (numUpdated) {
          console.log('Updated Successfully %d document(s).', numUpdated);
          res.end('good');
        } else {
          console.log('No document found with defined "find" criteria!');
        }
        db.close();
      });
    }
  });
});

app.get('/update', function (req, res) {

res.setHeader('Content-Type', 'application/json');

var MongoClient = mongodb.MongoClient;
var urlm = 'mongodb://localhost:27017/js';

  MongoClient.connect(urlm, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', urlm);

      var collection = db.collection('users');

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
    }
  });
});
/*
// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
});

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});
*/

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});