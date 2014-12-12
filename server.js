/* jshint node:true, unused:false */
'use strict';

var express = require('express'),
    configure = require('./server/configure'),
    _ = require('underscore'),
    path = require('path'),
    mongodb = require('./server/mongo_client'),
    app = express();

app = configure(app);

var server = app.listen(app.get('port'), function() {
    console.log('Web Server up: http://localhost:' + app.get('port'));
    mongodb.connect('mongodb://localhost:27017/movieq');
});

process.on('SIGTERM', function() {
    server.close(function() { return process.exit(); });
    return setTimeout(function() { return process.exit(1); }, 30 * 1000);
});
