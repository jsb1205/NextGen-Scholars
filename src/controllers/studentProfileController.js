const Student = require("../models/student");

const studentHomePage = (req, res) => {
  res.render("index");
}


module.exports = {
  studentHomePage
}