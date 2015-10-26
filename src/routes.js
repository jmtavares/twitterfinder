/*global module:true, require:true , __dirname:true*/

'use strict';

module.exports = function (server, restify, twitter, appConfig, log) {
    var path = require('path');
    var controllers_path = path.join(__dirname, '/controllers');
    var constructor = require(controllers_path + '/tweetsController');
    var namespace = require('restify-namespace');

    var controllers = {
        tweetsController: new constructor(twitter, appConfig, log)
    };


    namespace(server, '/api', function () {
        server.get('/getTweets', controllers.tweetsController.getTweets.bind(controllers.tweetsController));
    });

    server.get(/\/?.*/, restify.serveStatic({
        directory: __dirname,
        default: 'index.html'
    }));
};
