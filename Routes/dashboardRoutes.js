const express = require("express");
const { getDashboardData } = require("../Controller/dashboardController.js");

const router = express.Router();

router.get("/dashboard/:userId", getDashboardData);

module.exports = router;
