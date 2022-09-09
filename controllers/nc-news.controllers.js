const { returnTopics, returnArticles, returnArticleId, returnUsers } = require ('../models/nc-news.models.js');

const getTopics = (req, res, next) => {
    returnTopics().then((topics) => {
        res.status(200).send({topics});
    })   
}

const getArticles = (req, res, next) => {
    returnArticles().then((articles) => {
        res.status(200).send({articles});
    })
}

const getArticleId = (req, res, next) => {
    const { article_id } = req.params;
    returnArticleId( article_id ).then((article) => {
    if (article === undefined) {
        return Promise.reject({status: 404, message: 'Item not found'})
    }
        res.send({article});
    })
    .catch( (err) => {
        next(err)})
}

const getUsers = (req, res, next) => {
    returnUsers().then((users) => {
        res.status(200).send({users});
    })
}


module.exports = { getTopics, getArticles, getArticleId, getUsers };