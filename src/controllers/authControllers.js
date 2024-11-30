const { User, StudentProfile } = require("../models/user");
const jwt = require("jsonwebtoken");

// funcction for handling errors
const handleErrors = err => {
  let errors = { email: "", password: "" };

  // incorrect mail
  if (err.message === "Incorrect email!") {
    errors.email = "That email is not registered!";
  }

  // incorrect password
  if (err.message === "Incorrect password!") {
    errors.password = "That password is not correct!";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "That email is already registered!";
    return errors;
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


// json web token functions
const expireTime = 2 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "nextgen scholars secret", {
    expiresIn: expireTime
  });
};


module.exports.signup_get = (req, res) => {
  res.render("../views/signup");
}

module.exports.login_get = (req, res) => {
  res.render("../views/login");
}

module.exports.about_us_get = (req, res) => {
  res.render("../views/about-us");
}

module.exports.scholarships_get = (req, res) => {
  res.render("../views/scholarships");
}

module.exports.university_get = (req, res) => {
  res.render("../views/university");
}

module.exports.programs_get = (req, res) => {
  res.render("../views/programs");
}

module.exports.extracurriculars_get = (req, res) => {
  res.render("../views/extracurriculars");
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: expireTime * 1000});
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: expireTime * 1000});
    res.status(200).json({ id: user._id, studentProfile: user.studentProfile, educatorProfile: user.educatorProfile });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.logout_get = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
}

module.exports.profile_select_get = async (req, res) => {
  res.render("profile-select");
}
