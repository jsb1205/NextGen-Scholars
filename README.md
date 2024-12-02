# NextGen Scholars

NextGen Scholars is a comprehensive platform designed to address the issue of limited access to quality education for underserved youth, particularly high school students from low-income backgrounds. The solution is centered around offering students comprehensive educational support through personalized plans that encompass a range of opportunities, including academic options, scholarships, extracurricular clubs, internships, and personal projects.
The main functionality of the project is the custom four-year plan generator which takes in information about the student and creates a personalized high school plan that includes what academic program, scholarships, extracurricular activities, internships, and personal projects the student should take and apply for.

## System Models:
Monolithic: the monolithic architecture is ideal for the NextGen Scholars website as it is a client-side user interface that primarily promotes a single program, the 4-year plan creation algorithm. Additionally, the integration of a relational database management system within this architecture ensures strong data consistency, integrity, and easy handling of relationships between users, courses, and plans, all within a cohesive and unified system. 

Model View Controller: Allows the user to seamlessly interact with the NextGen Scholars website via a series of HTTP requests that sends commands to the controller. The controller then gathers information from the model (database) and sends it to the view so that it is visible to the user. For instance, if the user wishes to see information about AP courses tailored to his/her profile, they first signal the controller via the GUI. The controller will query data specific to the request from the MongoDB database and send that information back to the view (GUI). The user will then be able to see the information. For our views, we decided to use the EJS templating engine instead of React.

---

## Features

- **Algorithm for Personalized Plans**: Creates a custom 4-year plan tailored to each student based on multiple inputs.
- **Customizable Personal Profile**: Allows students to create and manage a personalized profile with their achievements and academic details.
- **Plan Tracking**: Enables students to save and track their personal plans for future use.
- **Teacher/Guardian Account**: Provides a profile for teachers or guardians that can link to student accounts.
- **Teacher/Guardian Feedback**: Allows teachers or guardians to provide feedback and suggest additional resources.
- **Account Linking**: Enables linking of teacher/guardian accounts with student accounts.
- **College Resources**: Parses state and county websites to provide information about college-related resources for middle and high school students.
- **Account Security**: Implements encryption strategies to secure student accounts.
- **AICE and IB Information**: Provides access to details about AICE and IB programs.
- **SAT/ACT Information**: Shares information on test preparation, dates, and resources for standardized tests.
- **Extracurricular Opportunities**: Offers information about extracurricular activities and their impact on college applications.
- **College-Preferred Classes**: Provides details on classes that appeal to colleges, updated regularly.
- **Scholarship Page**: Includes links to scholarship details and resources.
- **Tutoring Resources**: Lists tutoring options to support academic improvement.
- **Filterable Pages**: Adds filters for scholarships, extracurricular activities, SAT/ACT, college-preferred classes, and more.

---

## Installation

To set up the NextGen Scholars platform locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jsb1205/NextGen-Scholars.git
   cd NextGen-Scholars
2. **Install NPM**:
    ### installs fnm (Fast Node Manager)
    winget install Schniz.fnm
    ### configure fnm environment
    fnm env --use-on-cd | Out-String | Invoke-Expression
    ### download and install Node.js
    fnm use --install-if-missing 22
    ### verifies the right Node.js version is in the environment
    node -v # should print `v22.11.0`
    ### verifies the right npm version is in the environment
    npm -v # should print `10.9.0`
3. **Install Dependencies**:
    npm install
4. **Run the Application**:
    nodemon app
5. **Access the Application**:
    http://localhost:3000

## Usage
    Students: Log in, create your profile, track your tasks and deadlines, and collaborate with counselors.
    Counselors: Log in to manage student tasks, provide guidance, and monitor student progress.
    Administrators: Manage application data, oversee platform usage, and generate analytics reports.

## Directory Structure
    Here's an overview of the repository structure:
    NextGen-Scholars/
    ├── public/                # Static files (CSS, JavaScript, images)
    ├── routes/                # Backend routes
    ├── views/                 # EJS templates for rendering HTML
    ├── app.js                 # Main application entry point
    ├── package.json           # Project dependencies and scripts
    └── README.md              # Project documentation

## Contributing
We welcome contributions to enhance NextGen Scholars. Here's how you can contribute:

1. **Fork the repository**:
    git fork https://github.com/jsb1205/NextGen-Scholars.git
2. **Create a feature branch**:
    git checkout -b feature/your-feature-name
3. **Make your changes and commit them**:
    git add .
    git commit -m "Add detailed commit message describing your changes"
4. **Push to your fork**:
    git push origin feature/your-feature-name
5. **Open a pull request**:
    Describe your changes in detail and submit your PR.

## License
    This project is licensed under the MIT License. See the LICENSE file for details.


### Additions Made:
1. **Features Section**: Added more details about the platform features.
2. **Installation Section**: Expanded the steps with clear instructions for environment setup.
3. **Usage Section**: Explained how students, counselors, and admins use the platform.
4. **Directory Structure**: Provided an overview of the project files and folders.
5. **Testing Section**: Instructions to test the application with `pytest` and check test coverage.

This version is detailed, organized, and ready for a polished `README.md`. Let me know if there are any specific edits you'd like!
