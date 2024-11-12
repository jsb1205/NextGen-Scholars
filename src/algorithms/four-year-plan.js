// Input: user.studentProfile
// Output: set containing list of academic options
export const academicCalculator = (student) => {
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
    academics.add("Dual-Enrollment");
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

  return academics;
}


// Input: user.studentProfile
// Output: set containing list of scholarships
export const scholarshipCalculator = (student) => {
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


// Input: user.studentProfile
// Output: set containing list of extracurriculars/clubs
export const clubCalculator = (student) => {
  let interestsList = new Set();
  const interests = student.interests;
  const gender = student.gender;
  const gpa = student.gpa;

  if (interests.includes("science")) {
    interests.add("Science-Olympiad");
    interestsList.add("FFA");
  }
  if (interests.includes("technology")) {
    interestsList.add("TSA");
  }
  if (gender === "female" && (interests.includes("technology") || interests.includes("engineering"))) {
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


// Not applicable if student.studentProfile.age < 16
// Input: user.studentProfile
// Output: set containing list of internships
export const internshipCalculator = (student) => {
  let internships = new Set();
  const schoolYear = student.schoolYear;
  const interests = student.interests;
  const gpa = student.gpa;

  if (schoolYear >= 11 && interests.includes("medicine")) {
    internships.add("JJ-Vance-Memorial-Summer-Internship");
    internships.add("Cell-Science-Summer-Internship");
    if (gpa >= 2.5)
      internships.add("Nicklaus-Children's-Hospital-Teen-Academic-Year-Program");
  }
  if (schoolYear === 12 && interests.includes("medicine")) {
    internships.add("FIU's-Summer-Research-Internship-In-Cardiovascular-Health");
  }
  if (schoolYear >= 9 && interests.includes("medicine")) {
    internships.add("Medicine-Encompassed-Observer-Program-At-Baptist-Health-Academics");
  }
  if (schoolYear >= 11 && interests.includes("science")) {
    internships.add("High-School-Summer-Internship-Program-At-FIU's-Center-For-Translational-Science");
  }
  if (schoolYear >= 11 && gpa > 3) {
    internships.add("Kenan-Fellows-High-School-Summer-Internships-At-The-University-Of-Florida-Health");
  }
  if (gpa >= 2.5 && interests.includes("environment")) {
    internships.add("Fleet-Services-Student-Intern-9039");
  }

  return internships;
}


// Input: user.studentProfile
// Output: Set containing list of potential personal projects
export const personalProjectCalculator = (student) => {
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

  return projects;
}

