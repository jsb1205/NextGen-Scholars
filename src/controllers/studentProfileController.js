const Student = require("../models/student");

const student_home_page = (req, res) => {
  res.render("index");
}


module.exports = {
  student_home_page
}