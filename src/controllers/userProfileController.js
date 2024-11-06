const { User, StudentProfile, EducatorProfile } = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");



// home pages for students and educators
const student_home_page_get = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  // find the assocciated user model with the id
  const user = await User.findById(id)
    .populate("studentProfile")
    .exec();

  res.render("student-home", { user });
}

const educator_home_page_get = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  // find the assocciated user model with the id
  const user = await User.findById(id)
    .populate("educatorProfile")
    .exec();

  res.render("educator-home", { user });
}



// Update student profile interests
const student_interests_update = async (req, res) => {
  const { id, selectedInterests } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  try {
    const updatedUser = await User.findById(id)
      .populate("studentProfile")
      .exec();
    
    updatedUser.studentProfile.interests = selectedInterests;

    const updated = await updatedUser.studentProfile.save();

    if (!updated) {
      res.status(400).json({error: "Error! User not updated!"});
      return;
    }
    
    res.status(200).json({success: "Successfully updated!"});
  }
  catch (err) {
    res.status(400).json({error: "User not updated!"});
  }
  
}



// student and educator profile creation
const student_create_profile_get = (req, res) => {
  res.render("create-student-profile");
}

const student_create_profile_post = async (req, res) => {
  const { firstName, lastName, ageNum, schoolYear, gender, race, gpaNum, school, id } = req.body;
  const idObject = new mongoose.Types.ObjectId(id);


  try {
    const studentProfile = await StudentProfile.create({ firstName, lastName, age: ageNum, schoolYear, gender, race, gpa: gpaNum, school, credentials: idObject });
    
    const updated = await User.findByIdAndUpdate(
      idObject, 
      { studentProfile: studentProfile._id },
      { new: true, runValidators: true }
    );

    res.status(201).json({ student: studentProfile.firstName });
  }
  catch (err) {
    const errors = "Please enter a valid school year! (6-12)";
    res.status(400).json({ errors });
  }
}

const educator_create_profile_get = (req, res) => {
  res.render("create-educator-profile");
}

const educator_create_profile_post = async (req, res) => {
  const { firstName, lastName, school, students, id } = req.body;
  const idObject = new mongoose.Types.ObjectId(id);

  // class id generation
  // each class id will be 10 characters long
  let unique = false;
  let classId = "";
  do {
    classId = "";
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 10; i++) {
        classId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    if (!(await EducatorProfile.findOne({classId}))) {
      unique = true;
    }
  } while (!unique);

  try {
    let educatorProfile;
    if (students.length > 0) {
      const studentProfiles = [];
      for (const studentEmail of students) {
        const student = await User.findOne({ email: studentEmail });
        console.log(student);
    
        if (student && student.studentProfile) {
            await student.populate("studentProfile");
            studentProfiles.push(student._id);
        }
      }
      educatorProfile = await EducatorProfile.create({ firstName, lastName, school, students: studentProfiles, classId, credentials: id});
    }
    else {
      educatorProfile = await EducatorProfile.create({ firstName, lastName, school, classId: classId, credentials: id});
    }

    await User.findByIdAndUpdate(
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



const student_profile_get = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  const user = await User.findById(id)
    .populate("studentProfile")
    .exec();

  console.log(user);

  res.render("student-profile", { user });
}

const educator_profile_get = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  const user = await User.findById(id)
    .populate("educatorProfile")
    .exec();

  res.render("educator-profile", { user });
}

const student_profile_update_interests_get = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  const user = await User.findById(id)
    .populate("studentProfile")
    .exec();
  
  res.render("edit-personal-info", { user });
}

const student_profile_update_interests_update = async (req, res) => {
  const { firstName, lastName, ageNum, schoolYear, gender, race, gpaNum, school, id } = req.body;
  const idObject = new mongoose.Types.ObjectId(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  try {
    const updatedUser = await User.findById(id)
      .populate("studentProfile")
      .exec();
    
    updatedUser.studentProfile.firstName = firstName;
    updatedUser.studentProfile.lastName = lastName;
    updatedUser.studentProfile.age = ageNum;
    updatedUser.studentProfile.schoolYear = schoolYear;
    updatedUser.studentProfile.gender = gender;
    updatedUser.studentProfile.race = race;
    updatedUser.studentProfile.gpa = gpaNum;
    updatedUser.studentProfile.school = school;
    updatedUser.studentProfile.credentials = idObject;

    await updatedUser.save();
    const updated = await updatedUser.studentProfile.save();

    if (!updated) {
      res.status(400).json({error: "Error! User not updated!"});
      return;
    }

    res.status(200).json({success: "Successfully updated!"});
  }
  catch (err) {
    const errors = "Please enter a valid school year! (6-12)";
    res.status(400).json({ errors });
  }
}

const student_add_educator = async (req, res) => {
  const { classId, studentId } = req.body;

  const educator = await EducatorProfile.findOne({ classId });

  if (!educator) {
    return res.status(404).json({noProfile: "No profile found!"});
  }

  try {
    const user = await User.findById(studentId)
    .populate("studentProfile")
    .exec();
  
    user.studentProfile.educator = educator._id;

    const updated = await user.studentProfile.save();
    await user.save();

    if (!updated) {
      res.status(400).json({error: "Error! User not updated!"});
      return;
    }
    
    res.status(200).json({success: "Successfully updated!"});
  }
  catch (err) {
    res.status(400).json({ err });
  }
}


module.exports = {
  student_home_page_get,
  educator_home_page_get,
  student_create_profile_get,
  student_create_profile_post,
  educator_create_profile_get,
  educator_create_profile_post,
  student_interests_update,
  student_profile_get,
  educator_profile_get,
  student_profile_update_interests_get,
  student_profile_update_interests_update,
  student_add_educator
}