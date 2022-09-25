const express = require("express");
const apiRouter = express.Router();

const articlesRouter = require("./articles-router");
const commentsRouter = require("./comments-router");
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");

const { getRoot, getApi } = require("../controllers/api-controller");

apiRouter.use(express.json());
apiRouter.route("/").get(getRoot);
apiRouter.route("/api").get(getApi)

apiRouter.use("/api/articles", articlesRouter);
apiRouter.use("/api/comments", commentsRouter);
apiRouter.use("/api/topics", topicsRouter);
apiRouter.use("/api/users", usersRouter);

module.exports = apiRouter;