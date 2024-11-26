const express = require("express");
const route = express.Router();
const { register, login, getUserData } = require("../controllers/userController");
const authenticateToken = require("../middleware/authenticateToken");

route.post("/", register);
route.post("/login", login);
route.get("/getUserData", authenticateToken, getUserData);

module.exports = route;