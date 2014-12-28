    index: function(req, res) {
        if (!req.session.userId) {
            res.redirect('/login');
        } else {
            var filter = {
                    'userId': req.session.userId,
                    'watched': false
                },
                options = {
                    sort: [['release_date',1]]
                };

            client.db().collection('movies')
                .find(filter, {}, options)
                .toArray(function(err, movies) {
                    if (err) { throw err; }
                    res.render('index', { 'movies': movies });
                });
        }
    },
