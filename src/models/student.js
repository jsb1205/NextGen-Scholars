const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
const { float } = require("webidl-conversions");
const Schema = mongoose.Schema;


const studentSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "Please enter a unique email"],
    lowercase: true
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Minimum password length is 6 characters"],
    validate: {
      validator: value => {
        const hasLetter = /[a-zA-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        return hasLetter && hasNumber && hasSpecialChar;
      },
      message: 
        "Password must contain at least one letter, one number, and one special character!"
    }
  }
}, {timestamps: true});

const Student = mongoose.model("Student", studentSchema);

const studentProfileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gpa: {
    type: Decimal128,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  race: {
    type: String,
    required: true
  },
  middle_school: {
    type: String
  },
  high_school: {
    type: String
  },
  credentials: {
    type: Schema.Types.ObjectId,
    ref: "Student",    // Reference to the linked credentials
    required: true
  }
});

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);


module.exports = {
  Student,
  StudentProfile,
};
