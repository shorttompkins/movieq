/* jshint node:true */
'use strict';

var controller = require('./controller');

module.exports.initialize = function(app, router) {
    router.get('/', controller.index);

    router.get('/login', controller.showLogin);
    router.post('/login', controller.processLogin);

    router.post('/movie', controller.addMovie);

    app.use('/', router);
};
