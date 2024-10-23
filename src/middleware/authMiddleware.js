const jwt = require("jsonwebtoken");
const { User, StudentProfile, EducatorProfile } = require("../models/user");

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

const checkCurrUser = (req, res, next) => {
  const token = req.cookies.jwt;

  // if user is logged in
  if (token) {
    jwt.verify(token, "nextgen scholars secret", async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      }
      else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  }
  else {
    res.locals.user = null;
    next();
  }
}

module.exports = { requireAuth, checkCurrUser };
