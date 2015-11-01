/*global module:true, require:true,  process:true */

'use strict';

function twitterfinderApi() {
    var express = require('express');
    var appConfig = require('./config/config.json');
    var bunyan = require('bunyan');
    var compress = require('compression');
    var bodyParser = require('body-parser');
    var port = process.env.PORT || 8080;

    //Initialize logger instance
    var log = bunyan.createLogger({
        name: appConfig.name,
        streams: [{
            level: 'info',
            stream: process.stdout
        }]
    });

    var app = global.app = express();

    app.use(compress());
    app.use(bodyParser());

    app.set('port', port);

    //Create Twitter Client
    var Twitter = require("twitter-node-client").Twitter;

    var config = {
        'consumerKey': process.env.CONSUMERKEY || '',
        'consumerSecret': process.env.CONSUMERSECRET || '',
        'accessToken': process.env.ACCESSTOKEN || '',
        'accessTokenSecret': process.env.ACCESSTOKENSECRET || ''
    };

    log.info(config);

    var twitter = new Twitter(config);

    //Create routes and controllers
    require('./routes')(app, express, twitter, appConfig, log);

    //Init app
    app.listen(app.get('port'), () => {
        log.info(appConfig.name + ' is ready at port: ' + port);
        if (process.send) {
            process.send('online');
        }
    });

}

module.exports.twitterfinderApi = twitterfinderApi();
