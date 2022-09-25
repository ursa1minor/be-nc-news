const express = require("express");
const topicsRouter = express.Router();

const { getTopics } = require("../controllers/topics-controller");

topicsRouter.use(express.json());

topicsRouter.route("/").get(getTopics);

module.exports = topicsRouter;