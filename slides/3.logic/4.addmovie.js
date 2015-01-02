    addMovie: function(req, res) {
        var apiUrl = [
                'http://api.themoviedb.org/3/movie/',
                req.body.movieid,
                '?api_key=YOUR_API_KEY_HERE'
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
