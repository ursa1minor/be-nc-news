const express = require("express");
const usersRouter = express.Router();

const { getUsers, getUserByUsername } = require("../controllers/users-controller");

usersRouter.use(express.json());

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUserByUsername);

module.exports = usersRouter;