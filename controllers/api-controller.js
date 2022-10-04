const { returnApi } = require ('../models/api-model.js');

exports.getApi = (req, res, next) => {
    const endpoints = returnApi()
    res.status(200).send(endpoints)
}

