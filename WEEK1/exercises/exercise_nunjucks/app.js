var express = require('express'),
    app = express(),
    engines = require('consolidate');

app.engine('html', engines.nunjucks); // Nunjucks template engine is associated with html extension
app.set('view engine', 'html'); // set the engine to render html
app.set('views', __dirname + '/views'); // specify where the templates are located

app.get('/', function(req, res) {
    res.render('hello', { name : 'Templates' });
});

app.use(function(req, res){
    res.sendStatus(404); 
});

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s', port);
});
