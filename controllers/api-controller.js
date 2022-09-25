const { returnApi } = require ('../models/api-model.js');

exports.getRoot = (req, res, next) => {
    res.status(200).send({ message: "Welcome to Northcoders News API"})
}

exports.getApi = (req, res, next) => {
    const endpoints = returnApi()
    res.status(200).send(endpoints)
}
