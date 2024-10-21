const jwt = require("jsonwebtoken");
const { Student, StudentProfile } = require("../models/student");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // if user is logged in
  if (token) {
    jwt.verify(token, "nextgen scholars secret", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      }
      else {
        next();
      }
    });
  }
  else {
    res.redirect("/login");
  }
}

const checkCurrStudent = (req, res, next) => {
  const token = req.cookies.jwt;

  // if user is logged in
  if (token) {
    jwt.verify(token, "nextgen scholars secret", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.student = null;
        next();
      }
      else {
        let student = await Student.findById(decodedToken.id);
        res.locals.student = student;
        next();
      }
    });
  }
  else {
    res.locals.student = null;
    next();
  }
}

module.exports = { requireAuth, checkCurrStudent };