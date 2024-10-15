const { Student, StudentProfile } = require("../models/student");

// handle errors
const handleErrors = err => {
  let errors = { email: "", password: "" };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "That email is already registered!";
    return errors;
  }

  // validation errors
  if (err.message.includes("Student validation failed")) {
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


module.exports.signup_get = (req, res) => {
  res.render("../views/signup");
}

module.exports.login_get = (req, res) => {
  res.render("../views/login");
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.create({ email, password });
    res.status(201).json(student);
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;


}