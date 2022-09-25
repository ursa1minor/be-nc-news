const express = require("express");
const commentsRouter = express.Router();

const { deleteComment } = require("../controllers/comments-controller");

commentsRouter.use(express.json());

commentsRouter
    .route("/:comment_id")
    .delete(deleteComment);

module.exports = commentsRouter;