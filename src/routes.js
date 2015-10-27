/*global module:true, require:true , __dirname:true*/

'use strict';

module.exports = function (app, express, twitter, appConfig, log) {

    var path = require('path');
    var controllers_path = path.join(__dirname, '/controllers');
    var constructor = require(controllers_path + '/tweetsController');
    var controllers = {
        tweetsController: new constructor(twitter, appConfig, log)
    };

    app.get('/api/getTweets', controllers.tweetsController.getTweets.bind(controllers.tweetsController));

    app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('*', function(req, res){
        res.sendFile(__dirname + '/404.html');
    });
};
