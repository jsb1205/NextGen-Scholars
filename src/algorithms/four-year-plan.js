// Input: user.studentProfile
// Output: set containing list of scholarships
const scholarshipCalculator = (student) => {
  let scholarships = new Set();

  // assuming all our users are from Florida
  scholarships.add("Bright-Futures-Scholarship");

  if (student.race === "native-american" || 
      student.race === "black" ||
      student.race === "hispanic") {
    scholarships.add("Gates-Scholarship");
    scholarships.add("Sallie-Mae-Scholarship");
  }

  if (student.gender === "femaile") {
    scholarships.add("Gates-Scholarship");
    scholarships.add("Sallie-Mae-Scholarship");
    scholarships.add("Colonel-Kathleen-Swacina-Scholarship");
  }

  if (student.interests.length > 0) {
    if (student.interests.includes("science") ||
        student.interests.includes("technology") ||
        student.interests.includes("engineering") ||
        student.interests.includes("math")) {
      scholarships.add("Colonel-Kathleen-Swacina-Scholarship");
    }
  }

  return scholarships;
}


// Input: user.studentProfile.interests (type is array), gender, and GPA
// Output: set containing list of extracurriculars/clubs
const interestCalculator = (interests, gender, gpa) => {
  let interestsList = new Set();

  if (interests.includes("science")) {
    interests.add("Science-Olympiad");
    interestsList.add("FFA");
  }
  if (interests.includes("technology")) {
    interestsList.add("TSA");
  }
  if (gender === "femaile" && (interests.includes("technology") || interests.includes("engineering"))) {
    interestsList.add("Girls-Who-Code");
  }
  if (interests.includes("engineering")) {
    interestsList.add("FRC-Robotics");
    interestsList.add("FTC-Robotics");
  }
  if (interests.includes("math")) {
    interestsList.add("Mu-Alpha-Theta");
  }
  if (interests.includes("arts")) {
    interestsList.add("National-Art-Honors-Society");
    interestsList.add("Theatre");
    interestsList.add("Photography-Club");
  }
  if (interests.includes("politics")) {
    interestsList.add("FBLA");
    interestsList.add("Speech-and-Debate");
  }
  if (interests.includes("history")) {
    interestsList.add("Mock-Trial");
    interestsList.add("Model-UN");
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
    interestsList.add("National-English-Honors-Society");
    interestsList.add("Speech-and-Debate");
  }
  if (interests.includes("music")) {
    interestsList.add("Band");
    interestsList.add("Choir");
    interestsList.add("Orchestra");
  }
  if (gpa >= 3.8) {
    interestsList.add("National-Honor-Society");
  }

  return interestsList;
}


// Input: user.studentProfile
// Output: set containing list of internships
const internshipCalculator = (student) => {

}

