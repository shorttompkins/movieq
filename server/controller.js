/* jshint node:true */
'use strict';

var client = require('./mongo_client');

module.exports =  {
    index: function(req, res) {
        if (!req.session.userId) {
            res.redirect('/login');
        } else {
            var filter = {
                'userId': req.session.userId
                },
                options = {
                    sort: [['Title',1]]
                };

            client.db().collection('movies')
                .find(filter, {}, options)
                .toArray(function(err, movies) {
                    if (err) { throw err; }

                    res.render('index', movies);
                });
        }
    },
    showLogin: function(req, res) {
        res.render('login');
    },
    processLogin: function(req, res) {
        // TO DO: handle both scenarios where they are logging in OR registering:

        req.session.userId = 1;
        res.redirect('/');
    },
    addMovie: function(req, res) {
        //http://api.themoviedb.org/3/search/movie?query=[TITLE]&api_key=1a6f86ad423cc5544304a6fe19960bd3
        //http://api.themoviedb.org/3/movie/[ID]?api_key=1a6f86ad423cc5544304a6fe19960bd3

        client.db().collection('movies').insert({
                'userId': req.session.userId,
                'movieId': req.body.id
            }, function(err){
                if (err) {
                    console.log(err);
                    res.status(500).json({error: 'There was an error!'});
                }
                res.json({success: true});
            });
    }
};
