const express = require("express");
const studentProfileController = require("../controllers/studentProfileController");
const { requireAuth, checkCurrStudent } = require("../middleware/authMiddleware");

const router = express.Router();


// Student profile routes
router.get("/", checkCurrStudent, studentProfileController.student_home_page_get);
router.get("/create-profile", checkCurrStudent, studentProfileController.student_create_profile_get);
router.post("/create-profile", checkCurrStudent, studentProfileController.student_create_profile_post);

// Protected routes
//router.get("/profile", requireAuth, (req, res) => res.render("/profile"));


module.exports = router;