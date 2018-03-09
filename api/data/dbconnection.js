var mongoose = require('mongoose');

var dbUrl = 'mongodb://localhost:27017/imean';
mongoose.connect(dbUrl);
mongoose.connection.on('connected', function () {
    console.log('database connected :)');
});
mongoose.connection.on('disconnected', function () {
    console.log('database disconnected! :(');
});
mongoose.connection.on('error', function (err) {
    console.log('database connetction error: ' + err);
});

require('./users.model');
require('./pages.model');