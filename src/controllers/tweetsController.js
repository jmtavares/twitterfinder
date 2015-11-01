/*global module:true, require: true */

'use strict';

module.exports = function tweetsController(twitter, appConfig, log) {
    this.getTweets = function (req, res, next) {
        if (req.body.username && req.body.query) {
            twitter.getUserTimeline(
                {
                    screen_name: req.body.username,
                    count: '200',
                    contributor_details: false,
                    trim_user: true,
                    include_rts: true
                },
                function (error) {
                    res.status(500);
                    res.json(error);
                },
                function (data) {
                    var tweets = JSON.parse(data);
                    var listTweets = [];
                    tweets.forEach(function (obj) {
                        if (obj.text.indexOf(req.body.query) !== -1) {
                            listTweets.push({
                                created_at: obj.created_at,
                                id: obj.id,
                                text: obj.text
                            });
                        }
                    });

                    res.status(200);
                    res.json(listTweets);
                });
        } else {
            res.status(400);
            res.json({
                reason: 'invalid params' 
            });
        }
    };
};

