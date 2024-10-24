const express = require("express");
const userProfileController = require("../controllers/userProfileController");
const { requireAuth, checkCurrUser } = require("../middleware/authMiddleware");

const router = express.Router();


// User profile routes
router.get("/student-home/:id", requireAuth, checkCurrUser, userProfileController.student_home_page_get);
router.get("/educator-home/:id", requireAuth, checkCurrUser, userProfileController.educator_home_page_get);
router.put("/student-home/update-interests", requireAuth, checkCurrUser, userProfileController.student_interests_update);
router.get("/create-student-profile", requireAuth, checkCurrUser, userProfileController.student_create_profile_get);
router.post("/create-student-profile", requireAuth, checkCurrUser, userProfileController.student_create_profile_post);
router.get("/create-educator-profile", requireAuth, checkCurrUser, userProfileController.educator_create_profile_get);
router.post("/create-educator-profile", requireAuth, checkCurrUser, userProfileController.educator_create_profile_post);

router.get("/student-profile/:id", requireAuth, checkCurrUser, userProfileController.student_profile_get);
router.get("/educator-profile/:id", requireAuth, checkCurrUser, userProfileController.educator_profile_get);



module.exports = router;