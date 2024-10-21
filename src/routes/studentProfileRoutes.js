const express = require("express");
const studentProfileController = require("../controllers/studentProfileController");
const { requireAuth } = require("../middleware/authMiddleware");

const router = express.Router();


// Student profile routes
router.get("/", studentProfileController.student_home_page);

// Protected routes
//router.get("/profile", requireAuth, (req, res) => res.render("/profile"));


module.exports = router;