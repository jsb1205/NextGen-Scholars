const { Router } = require("express");
const authController = require("../controllers/authControllers");

const router = Router();


// authentication routes
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/logout", authController.logout_get);
router.get("/profile-select", authController.profile_select_get);
router.get("/about-us", authController.about_us_get);
router.get("/scholarships", authController.scholarships_get);
router.get("/university", authController.university_get);
router.get("/programs", authController.programs_get);

module.exports = router;

