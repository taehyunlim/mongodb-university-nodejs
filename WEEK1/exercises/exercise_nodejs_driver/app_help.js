// https://university.mongodb.com/courses/MongoDB/M101JS/2018_March/discussion/forum/threads/5ab32165bbc53730d847fd66

const assert = require('assert')
const app = require('express')()
const { MongoClient } = require('mongodb')
const { nunjucks } = require('consolidate')

const { log, error } = console

const uri = 'mongodb://localhost'
const dbName = 'video'
const collectionName = 'movies'

configureApp(app)

MongoClient.connect(uri)
    .then(function clientConnectCB(client) {

        assert(client)

        log('Successfully connected to MongoDB.')

        const collection = client.db(dbName)
            .collection(collectionName)


        app.get('/', function getHomeCB(req, res, next) {

            collection.find()
                .toArray()
                .then((docs) => {
                    res.render('movies', { 'movies': docs } )
                })
                .catch((e) => {
                    res.status(422).send(`Error: ${e}`)
                })

        })

        app.use(function unhandledRouteCB(req, res) {
                res.sendStatus(404)
        })

    })
    .catch((e) => {
        error(e)
        process.exit()
    })



// **********************************************
function configureApp(app) {
    app.engine('html', nunjucks)
    app.set('view engine', 'html')
    app.set('views', `${__dirname}/views`)

    const server = app.listen(3000, function appListenCB() {
        const { port } = server.address()
        log(`Express server listening on port ${port}`)
    })

}

