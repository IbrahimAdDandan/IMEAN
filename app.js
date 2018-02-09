require('./api/data/dbconnection');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./api/routes');

app.set('port', 3000);
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/api', routes);

var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log('Start listning to the port: ' + port);
});