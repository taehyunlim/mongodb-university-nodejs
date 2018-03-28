var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017/video';

MongoClient.connect(url, function(err, client) {

    assert.equal(null, err);
    console.log("Successfully connected to server");
    const db = client.db('video');

    findDocuments(db, function() {
      client.close();
    });

});


const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('movies');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
    });
  }