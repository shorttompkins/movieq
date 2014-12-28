    addMovie: function(req, res) {
        var apiUrl = [
                'http://api.themoviedb.org/3/movie/',
                req.body.movieid,
                '?api_key=1a6f86ad423cc5544304a6fe19960bd3'
            ].join('');

        request({
                method: 'GET',
                uri: apiUrl,
                json: {}
            },
            function(error, response, movie) {
                if (!error) {
                    movie.userId = req.session.userId;
                    movie.watched = false;
                    client
                        .db()
                        .collection('movies')
                        .insert(movie, function(err) {
                            if (err) {
                                console.log(err);
                            }
                            res.redirect('/');
                        });
                }
            });
    },
