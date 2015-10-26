/*global module:true, require:true,  process:true */

'use strict';

function twitterfinderApi() {
    var restify = require('restify');
    var appConfig = require('./config/config.json');
    var bunyan = require('bunyan');
    var port = process.env.PORT || 3000;

    //Initialize logger instance
    var log = bunyan.createLogger({
        name: appConfig.name,
        streams: [{
            level: 'info',
            stream: process.stdout
        }]
    });

    var server = restify.createServer({
        log: log,
        name: appConfig.name
    });

    server.use(restify.bodyParser());
    server.use(restify.queryParser({mapParams: false}));
    server.use(restify.gzipResponse());

    //Create Twitter client
    var Twitter = require('twitter-node-client').Twitter;


    var config = {
        'consumerKey': process.env.CONSUMERKEY || '',
        'consumerSecret': process.env.CONSUMERSECRET || '',
        'accessToken': process.env.ACCESSTOKEN || '',
        'accessTokenSecret': process.env.ACCESSTOKENSECRET || ''
    };

    log.info(config);

    var twitter = new Twitter(config);

    //Create routes and controllers
    require('./routes')(server, restify, twitter, appConfig, log);

    //Init server
    server.listen(port, function (err) {
        if (err) {
            log.error(err);
        } else {
            log.info(appConfig.name + ' is ready at port: ' + port);
        }
    });

    function handleException(req, res, route, err) {
        //Generic Middleware exception
        if (res) {
            res.status(500);
            res.json({});
            log.error('process.on', err);
        } else {
            //Boot Exception
            log.error(err);
        }
    }

    //Handle Exceptions
    server.on('uncaughtException', handleException);
    process.on('uncaughtException', handleException);


}

module.exports.twitterfinderApi = twitterfinderApi();
