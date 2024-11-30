const express = require("express");
const userProfileController = require("../controllers/userProfileController");
const { requireAuth, checkCurrUser } = require("../middleware/authMiddleware");

const router = express.Router();


// User profile routes
router.get("/student-home/:id", requireAuth, checkCurrUser, userProfileController.student_home_page_get);
router.get("/educator-home/:id", requireAuth, checkCurrUser, userProfileController.educator_home_page_get);
router.put("/student-home/update-interests", requireAuth, checkCurrUser, userProfileController.student_interests_update);
router.get("/student-home/:id/get-interests", requireAuth, checkCurrUser, userProfileController.student_interests_get);
router.get("/create-student-profile", requireAuth, checkCurrUser, userProfileController.student_create_profile_get);
router.post("/create-student-profile", requireAuth, checkCurrUser, userProfileController.student_create_profile_post);
router.get("/create-educator-profile", requireAuth, checkCurrUser, userProfileController.educator_create_profile_get);
router.post("/create-educator-profile", requireAuth, checkCurrUser, userProfileController.educator_create_profile_post);

router.put("/educator-profile/:id/students/edit", requireAuth, checkCurrUser, userProfileController.educator_edit_students);
router.delete("/educator-profile/:id/students/delete", requireAuth, checkCurrUser, userProfileController.educator_delete_students);

router.get("/student-profile/:id", requireAuth, checkCurrUser, userProfileController.student_profile_get);
router.get("/educator-profile/:id", requireAuth, checkCurrUser, userProfileController.educator_profile_get);

router.get("/student-profile/:id/personal-info/edit", requireAuth, checkCurrUser, userProfileController.student_profile_update_interests_get);
router.put("/student-home/:id/personal-info/edit/put", requireAuth, checkCurrUser, userProfileController.student_profile_update_interests_update);
router.put("/student-home/:id/profile-picture/put", requireAuth, checkCurrUser, userProfileController.student_profile_picture_update);

router.get("/student-profile/:id/interests/edit", requireAuth, checkCurrUser, userProfileController.student_interests_update_get);

router.put("/student-home/add-educator", requireAuth, checkCurrUser, userProfileController.student_add_educator);

router.get("/student-home/:id/preview/get", requireAuth, checkCurrUser, userProfileController.student_home_preview_get);
router.get("/student-home/:id/preview/interests/get", requireAuth, checkCurrUser, userProfileController.student_preview_interests_get);

router.put("/educator-profile/:id/edit", requireAuth, checkCurrUser, userProfileController.educator_profile_edit);

module.exports = router;