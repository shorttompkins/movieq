    watchedMovie: function(req, res){
        client
            .db()
            .collection('movies')
            .update(
                {
                    userId: req.session.userId,
                    id: req.params.id*1
                }, {
                    $set: {
                        watched: true
                    }
                },
                function(err, movie){
                    if (err) {
                        console.warn(err.message);
                    }
                    res.json(movie);
                }
            );
    }
