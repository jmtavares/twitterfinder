/*global module:true, require:true , __dirname:true*/

'use strict';

module.exports = function (server, twitter, appConfig, log) {
    var path = require('path');
    var controllers_path = path.join(__dirname, '/controllers');
    var constructor = require(controllers_path + '/tweetsController');

    var controllers = {
        tweetsController: new constructor(twitter, appConfig, log)
    };

    server.get('/getTweets', controllers.tweetsController.getTweets.bind(controllers.tweetsController));
};
