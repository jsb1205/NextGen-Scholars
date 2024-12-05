// Import necessary modules and models
const { User, StudentProfile, EducatorProfile } = require("../models/user");
// Used for token-based authentication
const jwt = require("jsonwebtoken");
// MongoDB object modeling tool
const mongoose = require("mongoose");
// Convert Web IDL values to JavaScript
const { boolean } = require("webidl-conversions");

// Academic options calculator based on user profile
// Input: user.studentProfile
// Output: list of academic options
const academicCalculator = (student) => {
  const academics = new Set();
  const schoolYear = student.schoolYear;
  const gpa = student.gpa;

  // Logic to determine eligible academic programs
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

  // Return unique academic options as an array
  return [...academics];
}


// Scholarship options calculator based on user profile
// Input: user.studentProfile
// Output: list of scholarships
const scholarshipCalculator = (student) => {
  let scholarships = new Set();

  // Include state-based scholarships
  // assuming all our users are from Florida
  scholarships.add("Bright Futures Scholarship");

  // Add specific scholarships based on race and gender
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

  // STEM-specific scholarships
  if (student.interests.length > 0) {
    if (student.interests.includes("science") ||
        student.interests.includes("technology") ||
        student.interests.includes("engineering") ||
        student.interests.includes("math")) {
      scholarships.add("Colonel Kathleen Swacina Scholarship");
    }
  }

  // Return unique scholarships as an array
  return [...scholarships];
}



// Extracurricular/club options calculator based on user profile
// Input: user.studentProfile
// Output: list of extracurriculars/clubs
const clubCalculator = (student) => {
  let interestsList = new Set();
  const interests = student.interests;
  const gender = student.gender;
  const gpa = student.gpa;

  // Add clubs based on user interests
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

  // Return unique clubs as an array
  return [...interestsList];
}



// Internship options calculator based on user profile
// Not applicable if student.studentProfile.age < 16
// Input: user.studentProfile
// Output: list of internships
const internshipCalculator = (student) => {
  let internships = new Set();
  const schoolYear = student.schoolYear;
  const interests = student.interests;
  const gpa = student.gpa;

  // Add internships based on school year and interests
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

  // Return unique internships as an array
  return [...internships];
}


// Personal project ideas generator based on user profile
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

  // Return unique projects as an array
  return [...projects];
}





// Fetch the home page for students
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

// Fetch the home page for educators
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

// Fetch student interests
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

// Fetch student preview interests
const student_preview_interests_get = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  try {
    // Find the student profile by ID
    const student = await StudentProfile.findById(id)
    .exec();

    // Calculate programs, clubs, scholarships, internships, and projects for the student
    const programs = academicCalculator(student);
    const clubs = clubCalculator(student);
    const scholarships = scholarshipCalculator(student);
    const internships = internshipCalculator(student);
    const personalProjects = personalProjectCalculator(student);

    // Return the calculated interests
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
    // Handle errors during the process
    res.status(400).json({error: "Could not get interests!"});
  }
}

// Update student profile interests
const student_interests_update = async (req, res) => {
  const { id, selectedInterests } = req.body;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  try {
    // Find the user and populate the student profile
    const updatedUser = await User.findById(id)
      .populate("studentProfile")
      .exec();
    
    // Update the student's interests
    updatedUser.studentProfile.interests = selectedInterests;

    // Save the updated profile
    const updated = await updatedUser.studentProfile.save();

    if (!updated) {
      res.status(400).json({error: "Error! User not updated!"});
      return;
    }

    // Successfully updated
    res.status(200).json({
      success: "Successfully updated!"
    });
  }
  catch (err) {
    // Handle errors during update
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
    // Create a new student profile
    const studentProfile = await StudentProfile.create({ firstName, lastName, age: ageNum, schoolYear, gender, race, gpa: gpaNum, school, credentials: idObject });
    
    // Update the user with the new student profile ID
    const updated = await User.findByIdAndUpdate(
      idObject, 
      { studentProfile: studentProfile._id },
      { new: true, runValidators: true }
    );

    // Successfully created the profile
    res.status(201).json({ student: studentProfile.firstName });
  }
  catch (err) {
    // Handle errors during creation
    const errors = "Please enter a valid school year! (6-12)";
    res.status(400).json({ errors });
  }
}

// Create an educator profile
const educator_create_profile_get = (req, res) => {
  res.render("create-educator-profile");
}

const educator_create_profile_post = async (req, res) => {
  const { firstName, lastName, school, id } = req.body;
  const idObject = new mongoose.Types.ObjectId(id);

  // class id generation
  // each class id will be 10 characters long
  // Generate a unique class ID
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
    // Create a new educator profile
    const educatorProfile = await EducatorProfile.create({ firstName, lastName, school, classId: classId, credentials: id});

    // Update the user with the new educator profile ID
    await User.findByIdAndUpdate(
      idObject, 
      { educatorProfile: educatorProfile._id },
      { new: true, runValidators: true }
    );

    // Successfully created the profile
    res.status(201).json({ educator: educatorProfile.firstName });
  }
  catch (err) {
    // Handle errors during creation
    res.status(400).json({err});
  }
}


// Fetch and render the student profile
const student_profile_get = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No profile found!" });
  }

  // Find the user and populate the student profile
  const user = await User.findById(id)
    .populate("studentProfile")
    .exec();

  // Set a default profile picture if none exists
  // Add default profile picture if none is set
  if (!user.studentProfile || !user.studentProfile.profile) {
    user.studentProfile.profile = "default"; // Set default
  }  

  // Render the student profile
  res.render("student-profile", { user });
}

// Fetch and render the educator profile
const educator_profile_get = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  // Find the user and populate the educator profile
  const user = await User.findById(id)
    .populate("educatorProfile")
    .exec();

  // Render the educator profile
  res.render("educator-profile", { user });
}


// Update student profile interests
const student_profile_update_interests_get = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  
  const user = await User.findById(id)
    .populate("studentProfile")
    .exec();
  
  res.render("edit-personal-info", { user });
}

// Update student profile interests
const student_profile_update_interests_update = async (req, res) => {
  const { firstName, lastName, ageNum, schoolYear, gender, race, gpaNum, school, id } = req.body;
  const idObject = new mongoose.Types.ObjectId(id);

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  try {
    // Find the user and populate the student profile
    const updatedUser = await User.findById(id)
      .populate("studentProfile")
      .exec();
    
    // Update student profile fields
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

    // Save updated profile
    const updated = await updatedUser.studentProfile.save();

    if (!updated) {
      res.status(400).json({error: "Error! User not updated!"});
      return;
    }

    // Successfully updated
    res.status(200).json({success: "Successfully updated!"});
  }
  catch (err) {
    const errors = "Please enter a valid school year! (6-12)";
    res.status(400).json({ errors });
  }
}

// Add an educator to a student's profile
const student_add_educator = async (req, res) => {
  const { classId, studentId } = req.body;

  // Find the educator profile using the provided class ID
  const educator = await EducatorProfile.findOne({ classId });

  // If no educator is found, return an error
  if (!educator) {
    return res.status(404).json({noProfile: "No profile found!"});
  }

  try {
    // Find the user and populate the student profile
    const user = await User.findById(studentId)
    .populate("studentProfile")
    .exec();
  
    // Assign the educator to the student's profile
    user.studentProfile.educator = educator;
    await user.studentProfile.save();
    await user.save();

    // Add the student to the educator's list of students
    educator.students.push(user.studentProfile);
    await educator.save();
    
    // Successfully added the educator
    res.status(200).json({success: "Successfully updated!"});
  }
  catch (err) {
    // Handle errors during the update process
    res.status(400).json({ err });
  }
}

// Fetch and render the student interests update form
const student_interests_update_get = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  // Find the user and populate the student profile
  const user = await User.findById(id)
    .populate("studentProfile")
    .exec();

  // Render the interests update form  
  res.render("edit-interests", { user });
}

// Update the student's profile picture
const educator_profile_update = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, school } = req.body;

  console.log("Received Data:", { id, firstName, lastName, school });

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No profile found!" });
  }

  try {
    // Find the user and populate the student profile
    const user = await User.findById(id).populate("educatorProfile").exec();

    if (!user || !user.educatorProfile) {
      return res.status(404).json({ error: "Educator profile not found!" });
    }

    user.educatorProfile.firstName = firstName || user.educatorProfile.firstName;
    user.educatorProfile.lastName = lastName || user.educatorProfile.lastName;
    user.educatorProfile.school = school || user.educatorProfile.school;

    await user.educatorProfile.save();

    res.status(200).json({ success: "Educator profile updated successfully!" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(400).json({ error: "Failed to update educator profile!" });
  }
}


// Update the student's profile picture
const student_profile_picture_update = async (req, res) => {
  const { id } = req.params;
  const { profilePicture } = req.body;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No profile found!" });
  }

  try {
    // Find the user and populate the student profile
    const user = await User.findById(id)
      .populate("studentProfile")
      .exec();

    // Assign "default" if no profile picture is provided
    user.studentProfile.profile = profilePicture || "default";

    // Save the updated profile
    await user.studentProfile.save();

    // Successfully updated the profile picture
    res.status(200).json({ success: "Successfully updated!" });
  } catch (error) {
    // Handle errors during the update process
    res.status(400).json({ error });
  }
}

// Edit the list of students assigned to an educato
const educator_edit_students = async (req, res) => {
  const { id } = req.params;
  const { name, email, school } = req.body;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  // Find the educator by ID
  const educator = await User.findById(id)
    .select("-password")
    .populate("educatorProfile")
    .exec();

  try {

    // Find the student by email
    const student = await User.findOne({ email })
    .select("-password")
    .populate("studentProfile")
    .exec();

    // If the student is not found, return an error
    if (!student) {
      return res.status(404).json({noProfile: "No profile found!"});
    }

    // Check if the student is already assigned to a class or educator
    if (student.studentProfile.educator) {
      return res.status(400).json({exists: "Student is already assigned to a class!"});
    }

    // Check if the student is already in the educator's class
    if (educator.educatorProfile.students.some(studentProfile =>
      studentProfile.equals(student.studentProfile._id))) {
      return res.status(400).json({exists: "Student is already in your class!"});
    }

    // Add the student to the educator's class
    educator.educatorProfile.students.push(student.studentProfile);
    await educator.educatorProfile.save();

    // Assign the educator to the student's profile
    student.studentProfile.educator = educator.educatorProfile;
    await student.studentProfile.save();

    // Successfully updated the student list
    res.status(201).json({success: "Student list successfully updated!"});
  }
  catch (err) {
    // Handle errors during the update process
    res.status(400).json({error: "Could not update student list!"});
  }
}

// Render the student's home preview
const student_home_preview_get = async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No profile found!"});
  }

  // Find the student's profile and populate the educator
  const student = await StudentProfile.findById(id)
    .populate("educator")
    .exec();

  // Render the student's home preview
  res.render("student-home-preview", { student });
}

// Delete a student from an educator's list
const educator_delete_students = async (req, res) => {
  const { studentId } = req.body;
  const { id } = req.params;

  // Check if the provided IDs are valid
  if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(studentId)) {
    return res.status(404).json({error: "No profile found!"});
  }

  try {
    // Find the educator and remove the student from their list
    const educator = await User.findById(id)
      .populate("educatorProfile")
      .exec();

    
    educator.educatorProfile.students.pull(studentId);

    await educator.educatorProfile.save();

    // Remove the educator from the student's profile
    const student = await StudentProfile.findById(studentId);
    student.educator = null;
    await student.save();

    // Successfully removed the student
    res.status(200).json({ success: "Successful removeal" });
  }
  catch (error) {
    // Handle errors during the removal process
    res.status(400).json({ error });
  }
}


// Export all defined controllers
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
  educator_profile_update
}