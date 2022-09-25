const { returnComments, insertComment, removeComment } = require ('../models/comments-model.js');

  exports.deleteComment = (req, res, next) => {
    removeComment(req.params.comment_id)
        .then((delComment) => {
            res.status(200).send({message: 'Comment deleted'})
        })
        .catch((err) => {
            next(err);
        })
  }


