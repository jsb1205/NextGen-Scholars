const { User, StudentProfile, EducatorProfile } = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


// home pages for students and educators
const student_home_page_get = (req, res) => {
  res.render("student-home");
}

const educator_home_page_get = (req, res) => {
  res.render("educator-home");
}


// student and educator profile creation
const student_create_profile_get = (req, res) => {
  res.render("create-student-profile");
}

const student_create_profile_post = async (req, res) => {
  const { firstName, lastName, ageNum, gender, race, gpaNum, school, id } = req.body;
  const idObject = new mongoose.Types.ObjectId(id);


  try {
    const studentProfile = await StudentProfile.create({ firstName, lastName, age: ageNum, gender, race, gpa: gpaNum, school, credentials: idObject });
    
    const updated = await User.findByIdAndUpdate(
      idObject, 
      { studentProfile: studentProfile._id },
      { new: true, runValidators: true }
    );

    res.status(201).json({ student: studentProfile.firstName });
  }
  catch (err) {
    res.status(400).json({err});
  }
}

const educator_create_profile_get = (req, res) => {
  res.render("create-educator-profile");
}

const educator_create_profile_post = async (req, res) => {
  const { firstName, lastName, school, id } = req.body;
  const idObject = new mongoose.Types.ObjectId(id);

  try {
    const educatorProfile = await EducatorProfile.create({ firstName, lastName, school, credentials: id});
    
    const updated = await User.findByIdAndUpdate(
      idObject, 
      { educatorProfile: educatorProfile._id },
      { new: true, runValidators: true }
    );

    res.status(201).json({ educator: educatorProfile.firstName });
  }
  catch (err) {
    res.status(400).json({err});
  }
}


module.exports = {
  student_home_page_get,
  educator_home_page_get,
  student_create_profile_get,
  student_create_profile_post,
  educator_create_profile_get,
  educator_create_profile_post
}