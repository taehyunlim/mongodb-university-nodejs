// DEPENDENCIES
const app = require('express')();
const assert = require('assert');
const { MongoClient } = require('mongodb');
const { nunjucks } = require('consolidate');
const {log, error} = console;

// DB CONFIG
const url = 'mongodb://localhost:27017';
const dbName = 'video';
const collectionName = 'movies';

// EXPRESS CONFIG
app.engine('html', nunjucks);
app.set('view engine', 'html');
app.set('views', `${__dirname}/views`);

// Instantiate MongoClient object
MongoClient.connect(url, (err, client) => {
  
  // Use assert for exception handling
  assert.equal(null, err);
  log("Successfully connected to MongoDB server");

  // Assign db
  const db = client.db(dbName);

  // Express routes handling
  app.get('/', (req, res) => {

    // Perform query and render onto the server
    db.collection(collectionName).find({}).toArray((err, docs) => {
      res.render('index', { 'movies': docs });
    });

  });

  app.use((req, res) => {
    res.sendStatus(404);
  });

  const server = app.listen(3000, () => {
    let port = server.address().port;
    log(`Express server listening on port ${port}.`);
  } )

});