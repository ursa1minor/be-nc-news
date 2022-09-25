const { returnUsers, returnUserByUsername } = require ('../models/users-model.js');

exports.getUsers = (req, res, next) => {
    returnUsers()
        .then((users) => {
            res.status(200).send({ users });
    })
    .catch( (err) => {
        next(err)
    });
}

exports.getUserByUsername = (req, res, next) => {
    const username = req.params.username
    
    returnUserByUsername(username)
        .then((user) => {
            res.status(200).send({ user });
        })
    .catch( (err) => {
        next(err)
    });
}