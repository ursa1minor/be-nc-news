const { returnTopics, returnArticles, returnArticleId } = require ('../models/nc-news.models.js');

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
        console.log(article)
        res.send({article});
    })
}
module.exports = { getTopics, getArticles, getArticleId };