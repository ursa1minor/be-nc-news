const { returnTopics } = require ('../models/nc-news.models.js');

const getTopics = (req, res, next) => {
    returnTopics().then((topics) => {
        res.status(200).send({topics});
    })
    
}

module.exports = { getTopics };