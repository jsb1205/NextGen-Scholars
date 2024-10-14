const express = require("express");
const studentProfileController = require("../controllers/studentProfileController");

const router = express.Router();


// Student profile routes
router.get("/", studentProfileController.studentHomePage);


module.exports = router;