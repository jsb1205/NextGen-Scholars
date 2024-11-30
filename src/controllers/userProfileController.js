const { User, StudentProfile, EducatorProfile } = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

// Input: user.studentProfile
// Output: list of academic options
const academicCalculator = (student) => {
  const academics = new Set();
  const schoolYear = student.schoolYear;
  const gpa = student.gpa;

  if (schoolYear <= 8 && gpa >= 3) {
    academics.add("IB");
    academics.add("Magnet");
    academics.add("CAPS");
    academics.add("AICE");
  }
  if (schoolYear <= 8 && gpa < 3) {
    academics.add("Magnet");
  }
  if (schoolYear <= 10 && gpa >= 3) {
    academics.add("Dual Enrollment");
    academics.add("IB");
    academics.add("CAPS");
    academics.add("Honors");
    academics.add("AICE");
  }
  if (schoolYear <= 10 && gpa < 3) {
    academics.add("Honors");
  }
  if (schoolYear > 10) {
    academics.add("Honors");
    academics.add("AP");
  }

  return [...academics];
}


// Input: user.studentProfile
// Output: list of scholarships
const scholarshipCalculator = (student) => {
  let scholarships = new Set();

  // assuming all our users are from Florida
  scholarships.add("Bright Futures Scholarship");

  if (student.race === "native-american" || 
      student.race === "black" ||
      student.race === "hispanic") {
    scholarships.add("Gates Scholarship");
    scholarships.add("Sallie Mae Scholarship");
  }

  if (student.gender === "female") {
    scholarships.add("Gates Scholarship");
    scholarships.add("Sallie Mae Scholarship");
    scholarships.add("Colonel Kathleen Swacina Scholarship");
  }

  if (student.interests.length > 0) {
    if (student.interests.includes("science") ||
        student.interests.includes("technology") ||
        student.interests.includes("engineering") ||
        student.interests.includes("math")) {
      scholarships.add("Colonel Kathleen Swacina Scholarship");
    }
  }

  return [...scholarships];
}


// Input: user.studentProfile
// Output: list of extracurriculars/clubs
const clubCalculator = (student) => {
  let interestsList = new Set();
  const interests = student.interests;
  const gender = student.gender;
  const gpa = student.gpa;

  if (interests.includes("science")) {
    interestsList.add("FFA");
  }
  if (interests.includes("technology")) {
    interestsList.add("TSA");
  }
  if (gender === "female" && (interests.includes("technology") || interests.includes("engineering"))) {
    interestsList.add("Girls Who Code");
  }
  if (interests.includes("engineering")) {
    interestsList.add("FRC Robotics");
    interestsList.add("FTC Robotics");
  }
  if (interests.includes("math")) {
    interestsList.add("Mu Alpha Theta");
  }
  if (interests.includes("arts")) {
    interestsList.add("National Art Honors Society");
    interestsList.add("Theatre");
    interestsList.add("Photography Club");
  }
  if (interests.includes("politics")) {
    interestsList.add("FBLA");
    interestsList.add("Speech and Debate");
  }
  if (interests.includes("history")) {
    interestsList.add("Mock Trial");
    interestsList.add("Model UN");
  }
  if (interests.includes("sports")) {
    interestsList.add("Swimming");
    interestsList.add("Tennis");
    interestsList.add("Football");
    interestsList.add("Volleyball");
    interestsList.add("Soccer");
    interestsList.add("Baseball");
    interestsList.add("Basketball");
    interestsList.add("Cheerleading");
  }
  if (interests.includes("literature")) {
    interestsList.add("National English Honors Society");
    interestsList.add("Speech and Debate");
  }
  if (interests.includes("music")) {
    interestsList.add("Band");
    interestsList.add("Choir");
    interestsList.add("Orchestra");
  }
  if (gpa >= 3.8) {
    interestsList.add("National Honor Society");
  }

  return [...interestsList];
}


// Not applicable if student.studentProfile.age < 16
// Input: user.studentProfile
// Output: list of internships
const internshipCalculator = (student) => {
  let internships = new Set();
  const schoolYear = student.schoolYear;
  const interests = student.interests;
  const gpa = student.gpa;

  if (schoolYear >= 11 && interests.includes("medicine")) {
    internships.add("JJ Vance Memorial Summer Internship");
    internships.add("Cell Science Summer Internship");
    if (gpa >= 2.5)
      internships.add("Nicklaus Children's Hospital Teen Academic Year Program");
  }
  if (schoolYear === 12 && interests.includes("medicine")) {
    internships.add("FIU's Summer Research Internship In Cardiovascular Health");
  }
  if (schoolYear >= 9 && interests.includes("medicine")) {
    internships.add("Medicine Encompassed Observer Program At Baptist Health Academics");
  }
  if (schoolYear >= 11 && interests.includes("science")) {
    internships.add("High School Summer Internship Program At FIU's Center For Translational Science");
  }
  if (schoolYear >= 11 && gpa > 3) {
    internships.add("Kenan Fellows High School Summer Internships At The University Of Florida Health");
  }
  if (gpa >= 2.5 && interests.includes("environment")) {
    internships.add("Fleet Services Student Intern 9039");
  }

  return [...internships];
}


// Input: user.studentProfile
// Output: list of potential personal projects
const personalProjectCalculator = (student) => {
  const projects = new Set();
  const interests = student.interests;

  if (interests.includes("science")) {
    projects.add("Lead tutoring sessions");
    projects.add("Host youth mentoring");
  }
  if (interests.includes("technology")) {
    projects.add("Lead tutoring sessions");
    projects.add("Host youth mentoring");
    projects.add("Design an app");
    projects.add("Build and design a website");
    projects.add("Design a video game");
    projects.add("Learn a new programming language");
    projects.add("Learn about 3D modelling and printing");
  }
  if (interests.includes("engineering")) {
    projects.add("Lead tutoring sessions");
    projects.add("Host youth mentoring");
    projects.add('Design an app');
    projects.add("Build and design a website");
    projects.add("Design a video game");
    projects.add("Learn about a new programming language");
    projects.add("Learn about 3D modelling and printing");
  }
  if (interests.includes("math")) {
    projects.add("Lead tutoring sessions");
    projects.add("Host youth mentoring");
  }
  if (interests.includes("arts")) {
    projects.add("Build a photography/art portfolio");
    projects.add("Paint a mural locally");
  }
  if (interests.includes("politics")) {
    projects.add("Organize a food drive");
    projects.add("Organize a book drive");
    projects.add("Start a letter writing campaign for local politics");
    projects.add("Film video/documentary for a cause");
    projects.add("Start a blog");
    projects.add("Initiate a recycling program in a neighborhood");
  }
  if (interests.includes("history")) {
    projects.add("Lead tutoring sessions");
    projects.add("Host youth mentoring");
    projects.add("Organize a book drive");
  }
  if (interests.includes("sports")) {
    projects.add("Volunteer for youth sports teams");
  }
  if (interests.includes("literature")) {
    projects.add("Lead tutoring sessions");
    projects.add("Host youth mentoring");
    projects.add("Organize a book drive");
  }
  if (interests.includes("music")) {
    projects.add("Learn a new instrument");
  }
  if (interests.includes("medicine")) {
    projects.add("Lead tutoring sessions");
    projects.add("Host youth mentoring");
  }
  if (interests.includes("environment")) {
    projects.add("Start a community garden");
    projects.add("Film a video/documentary for a cause");
    projects.add("Initiate a recycling program in a neighborhood");
    projects.add("Host a street cleanup");
  }

  return [...projects];
}





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

  await user.studentProfile.populate("educator");

  res.render("student-home", { user });
}

const educator_home_page_get = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  // find the assocciated user model with the id
  const user = await User.findById(id)
  .populate({
      path: 'educatorProfile',
      populate: [
          {
              path: 'students',
              populate: {
                  path: 'credentials'
              }
          }
      ]
  })
  .exec();

  res.render("educator-home", { user });
}

const student_interests_get = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  try {
    const user = await User.findById(id)
    .populate("studentProfile")
    .exec();

    const programs = academicCalculator(user.studentProfile);
    const clubs = clubCalculator(user.studentProfile);
    const scholarships = scholarshipCalculator(user.studentProfile);
    const internships = internshipCalculator(user.studentProfile);
    const personalProjects = personalProjectCalculator(user.studentProfile);

    res.status(200).json({
      success: "Success!",
      programs,
      clubs,
      scholarships,
      internships,
      personalProjects
    });
  }
  catch (err) {
    res.status(400).json({error: "Could not get interests!"});
  }
}

const student_preview_interests_get = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  try {
    const student = await StudentProfile.findById(id)
    .exec();

    const programs = academicCalculator(student);
    const clubs = clubCalculator(student);
    const scholarships = scholarshipCalculator(student);
    const internships = internshipCalculator(student);
    const personalProjects = personalProjectCalculator(student);

    res.status(200).json({
      success: "Success!",
      programs,
      clubs,
      scholarships,
      internships,
      personalProjects
    });
  }
  catch (err) {
    res.status(400).json({error: "Could not get interests!"});
  }
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

    res.status(200).json({
      success: "Successfully updated!"
    });
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
  const { firstName, lastName, school, id } = req.body;
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
    const educatorProfile = await EducatorProfile.create({ firstName, lastName, school, classId: classId, credentials: id});

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
    return res.status(404).json({ error: "No profile found!" });
  }

  const user = await User.findById(id)
    .populate("studentProfile")
    .exec();

  // Add default profile picture if none is set
  if (!user.studentProfile || !user.studentProfile.profile) {
    user.studentProfile.profile = "default"; // Set default
  }  

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
  
    user.studentProfile.educator = educator;
    await user.studentProfile.save();
    await user.save();

    educator.students.push(user.studentProfile);
    await educator.save();
    
    res.status(200).json({success: "Successfully updated!"});
  }
  catch (err) {
    res.status(400).json({ err });
  }
}

const student_interests_update_get = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  const user = await User.findById(id)
    .populate("studentProfile")
    .exec();

  res.render("edit-interests", { user });
}
const educator_profile_edit = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, school } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No profile found!" });
  }

  try {
      const user = await User.findById(id)
          .populate("educatorProfile")
          .exec();

      if (!user.educatorProfile) {
          return res.status(404).json({ error: "Educator profile not found!" });
      }

      // Update fields
      user.educatorProfile.firstName = firstName || user.educatorProfile.firstName;
      user.educatorProfile.lastName = lastName || user.educatorProfile.lastName;
      user.educatorProfile.school = school || user.educatorProfile.school;

      // Save changes
      await user.educatorProfile.save();

      res.status(200).json({ success: "Educator profile updated successfully!" });
  } catch (error) {
      res.status(400).json({ error: "Failed to update educator profile!" });
  }
};


const student_profile_picture_update = async (req, res) => {
  const { id } = req.params;
  const { profilePicture } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No profile found!" });
  }

  try {
    const user = await User.findById(id)
      .populate("studentProfile")
      .exec();

    // Assign "default" if no profile picture is provided
    user.studentProfile.profile = profilePicture || "default";

    await user.studentProfile.save();

    res.status(200).json({ success: "Successfully updated!" });
  } catch (error) {
    res.status(400).json({ error });
  }
}

const educator_edit_students = async (req, res) => {
  const { id } = req.params;
  const { name, email, school } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  const educator = await User.findById(id)
    .select("-password")
    .populate("educatorProfile")
    .exec();

  try {

    const student = await User.findOne({ email })
    .select("-password")
    .populate("studentProfile")
    .exec();

    if (!student) {
      return res.status(404).json({noProfile: "No profile found!"});
    }

    if (student.studentProfile.educator) {
      return res.status(400).json({exists: "Student is already assigned to a class!"});
    }

    if (educator.educatorProfile.students.some(studentProfile =>
      studentProfile.equals(student.studentProfile._id))) {
      return res.status(400).json({exists: "Student is already in your class!"});
    }

    educator.educatorProfile.students.push(student.studentProfile);
    await educator.educatorProfile.save();

    student.studentProfile.educator = educator.educatorProfile;
    await student.studentProfile.save();

    res.status(201).json({success: "Student list successfully updated!"});
  }
  catch (err) {
    res.status(400).json({error: "Could not update student list!"});
  }
}

const student_home_preview_get = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  const student = await StudentProfile.findById(id)
    .populate("educator")
    .exec();

  res.render("student-home-preview", { student });
}

const educator_delete_students = async (req, res) => {
  const { studentId } = req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(404).json({error: "No profile found!"});
  }

  try {
    const educator = await User.findById(id)
      .populate("educatorProfile")
      .exec();

    educator.educatorProfile.students.pull(studentId);

    await educator.educatorProfile.save();

    const student = await StudentProfile.findById(studentId);
    student.educator = null;
    await student.save();

    res.status(200).json({ success: "Successful removeal" });
  }
  catch (error) {
    res.status(400).json({ error });
  }
}


module.exports = {
  student_home_page_get,
  educator_home_page_get,
  student_create_profile_get,
  student_create_profile_post,
  educator_create_profile_get,
  educator_create_profile_post,
  student_interests_get,
  student_interests_update,
  student_profile_get,
  educator_profile_get,
  student_profile_update_interests_get,
  student_profile_update_interests_update,
  student_add_educator,
  student_interests_update_get,
  student_profile_picture_update,
  educator_edit_students,
  student_home_preview_get,
  student_preview_interests_get,
  educator_delete_students,
  educator_profile_edit
}