const { Student, StudentProfile } = require("../models/student");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


const student_home_page_get = (req, res) => {
  res.render("index");
}

const student_create_profile_get = (req, res) => {
  res.render("create-profile");
}

const student_create_profile_post = async (req, res) => {
  const { firstName, lastName, ageNum, gender, race, gpaNum, school, id } = req.body;
  const idObject = new mongoose.Types.ObjectId(id);

  try {
    const studentProfile = await StudentProfile.create({ firstName, lastName, age: ageNum, gender, race, gpa: gpaNum, school, credentials: idObject });
    res.status(201).json({ student: studentProfile.firstName });
  }
  catch (err) {
    res.status(400).json({err});
  }
}


module.exports = {
  student_home_page_get,
  student_create_profile_get,
  student_create_profile_post
}