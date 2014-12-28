    processLogin: function(req, res) {
        var userObj = {
            email: req.body.email,
            password: req.body.password
        };

        client
            .db()
            .collection('users')
            .find(userObj, {}, {})
            .toArray(function(err, users) {
                if (users.length === 0) {
                    client
                        .db()
                        .collection('users')
                        .insert(userObj, function(err, users) {
                            req.session.userId = users[0]._id;
                            res.redirect('/');
                        });
                } else {
                    req.session.userId = users[0]._id;
                    res.redirect('/');
                }
        });
    },
