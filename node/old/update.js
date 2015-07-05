//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/js';

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);

// Get the documents collection
var collection = db.collection('teste');

// Insert some users
collection.update({name: 'modulus user'}, {$push: {roles: "pudimzero"}}, function (err, numUpdated) {
  if (err) {
    console.log(err);
  } else if (numUpdated) {
    console.log('Updated Successfully %d document(s).', numUpdated);
  } else {
    console.log('No document found with defined "find" criteria!');
  }
  //Close connection
  db.close();
});
}
});