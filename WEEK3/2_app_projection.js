
var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// https://stackoverflow.com/questions/37911838/how-to-use-mongodb-with-promises-in-node-js

MongoClient.connect('mongodb://localhost:27017/crunchbase', function(err, db) {

    assert.equal(err, null);
    console.log("Successfully connected to MongoDB.");

    // MongoDB Query
    var query = {"category_code": "biotech"};

    // Specify our projection
    var projection = {"name": 1, "category_code": 1, "_id": 0};

    // Declare a cursor
    var cursor = db.collection('companies').find(query);
 
    // Modify the cursor with .project method
    cursor.project(projection);

    cursor.forEach(
        function(doc) {
            console.log(doc.name + " is a " + doc.category_code + " company.");
            console.log(doc);
        },
        function(err) {
            assert.equal(err, null);
            return db.close();
        }
    );

});
