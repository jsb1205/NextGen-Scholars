const { Student, StudentProfile } = require("../models/student");

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
    console.log(err);
    res.status(400).send("error, student not created");
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;


}