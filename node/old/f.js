//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var http = require("http");
var url = require("url");

var server = http.createServer(function(req, res) {

  var parsedUrl = url.parse(req.url, true); // true to get query as object
  var queryAsObject = parsedUrl.query;

  var MongoClient = mongodb.MongoClient;
  var urlm = 'mongodb://localhost:27017/js';

  MongoClient.connect(urlm, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('Connection established to', urlm);

      var collection = db.collection('teste');

      collection.find({name: queryAsObject.name}).toArray(function (err, result) {
        if (err) {
          console.log(err);
          res.end(err);
        } else if (result.length) {
          console.log('Found:', result);
          res.end(JSON.stringify(result))
        } else {
          console.log('No document(s) found with defined "find" criteria!');
          res.end('No document(s) found with defined "find" criteria!');
        }
        db.close();
      });
    }
  });

}).listen(3000);

console.log("Server listening on port 3000");