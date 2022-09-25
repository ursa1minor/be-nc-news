const { returnUsers } = require ('../models/users-model.js');

exports.getUsers = (req, res, next) => {
    returnUsers()
        .then((users) => {
            res.status(200).send({ users });
    })
}