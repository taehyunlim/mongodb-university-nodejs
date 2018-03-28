var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var url = 'mongodb://localhost:27017';

MongoClient.connect(url, (err, client) => {

    assert.equal(null, err);
    console.log("Successfully connected to server");

    // Find some documents in our collection
    const db = client.db('video')
    db.collection('movies').find({}).toArray((err, docs) => {

        // Print the documents returned
        docs.forEach( doc => {
            console.log(doc.title);
        });

        // Close the DB
        client.close();
    });

    // Declare success
    console.log("Called find()");
});


