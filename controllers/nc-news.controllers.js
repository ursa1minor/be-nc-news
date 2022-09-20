const { returnTopics, returnComments, returnArticles, returnArticleId, returnUsers, updateArticleId, insertComment } = require ('../models/nc-news.models.js');

exports.getTopics = (req, res, next) => {
    returnTopics().then((topics) => {
        res.status(200).send({ topics });
    })   
}

exports.getArticles = (req, res, next) => {
	//const topic = req.query;
    const { sortby, order, topic } = req.query;
    returnArticles(sortby, order, topic)
	//returnArticles(topic)
		.then((articles) => {
		    res.status(200).send({ articles });
		})
		.catch((err) => {
			next(err);
		});
};

exports.getArticleId = (req, res, next) => {
    const article_id = req.params.article_id;

    returnArticleId( article_id )
        .then((article) => {
            res.status(200).send({ article });
    })
    .catch( (err) => {
        next(err)
    })
}

exports.getComments = (req, res, next) => {
    const article_id = req.params.article_id;
    returnComments( article_id )
        .then((comments) => {
           res.status(200).send({ comments });
    })
    .catch( (err) => {
        next(err)
    })
}

exports.getUsers = (req, res, next) => {
    returnUsers().then((users) => {
        res.status(200).send({ users });
    })
}

exports.patchArticleId = (req, res, next) => {
    const { inc_votes } = req.body
    const { article_id } = req.params;
    updateArticleId( article_id, inc_votes )
        .then((article) => {
    
    if (article === undefined) {
        return Promise.reject({status: 404, message: 'Item not found'})
    }
        res.status(200).send({ article });
    })
    .catch( (err) => {
        next(err)
    })
}

exports.postComment = (req, res, next) => {
    const { username } = req.body; 
    const { body } = req.body; 
    const { article_id}  = req.params; 

    insertComment( article_id, username, body )
      .then((newComment) => {
        res.status(201).send({ newComment });
      })
      .catch((err) => {
        next(err);
      });
  };


