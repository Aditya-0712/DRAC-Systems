const express = require("express");
const route = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const { getPeople, addPeople, getBusinesses, configureBusiness, deletePerson } = require("../controllers/businessController");

route.get("/getPeople", authenticateToken, getPeople);
route.post("/addPeople", authenticateToken, addPeople);
route.get("/getBusinesses", authenticateToken, getBusinesses);
route.put("/configureBusiness", authenticateToken, configureBusiness);
route.delete("/deletePerson", authenticateToken, deletePerson);

module.exports = route;