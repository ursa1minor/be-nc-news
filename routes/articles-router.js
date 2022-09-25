const express = require("express");
const articlesRouter = express.Router();

const { getArticles, getArticleId, patchArticleId, getComments, postComment } = require("../controllers/articles-controller");

articlesRouter.use(express.json());

articlesRouter.route("/").get(getArticles);

articlesRouter.route("/:article_id")
  .get(getArticleId)
  .patch(patchArticleId)

articlesRouter.route("/:article_id/comments")
    .get(getComments)
    .post(postComment)

module.exports = articlesRouter;