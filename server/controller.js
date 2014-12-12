/* jshint node:true */
'use strict';

var client = require('./mongo_client');

module.exports =  {
    index: function(req, res) {
        if (!req.session.userId) {
            res.redirect('/login');
        } else {
            res.render('index', { movies: [
                    { title: 'Aliens', release: '11/18/1989'}
                ]});
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
    newMovie: function(req, res) {
        res.render('add', {});
    },
    getMovies: function(req, res) {
        var options = {
                sort: [['Title',1]]
            };

        client.db().collection('movies')
            .find({'userId': req.session.userId }, {}, options)
            .toArray(function(err, scores) {
                if (err) { throw err; }

                res.json(scores);
            });
    },
    addMovie: function(req, res) {
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
