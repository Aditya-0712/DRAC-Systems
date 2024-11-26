const express = require("express");
const route = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const { getPeople, addPeople, getBusinesses } = require("../controllers/businessController");

route.get("/getPeople", authenticateToken, getPeople);
route.post("/addPeople", authenticateToken, addPeople);
route.get("/getBusinesses", authenticateToken, getBusinesses);

module.exports = route;