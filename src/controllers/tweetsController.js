/*global module:true, require: true */

'use strict';

module.exports = function tweetsController(twitter, appConfig, log) {
    this.getTweets = function (req, res, next) {
        if (req.query.screen_name) {
            twitter.getUserTimeline(
                {
                    screen_name: req.query.screen_name,
                    count: '10',
                    contributor_details: false,
                    trim_user: true,
                    include_rts: true
                },
                function (error) {
                    res.status(500);
                    res.json(error);
                },
                function (data) {
                    res.status(200);
                    res.json(JSON.parse(data));
                });
        } else {
            res.status(500);
            res.json({});
        }
    };
};

