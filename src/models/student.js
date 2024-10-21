const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;


const studentSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
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


// Mongoose hooks
// before document has been saved
studentSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// Method to log in user
studentSchema.statics.login = async function(email, password) {
  const student = await this.findOne({ email });
  if (student) {
    const auth = await bcrypt.compare(password, student.password);
    if (auth) {
      return student;
    }
    throw Error("Incorrect password!");
  }
  throw Error("Incorrect email!");
}

const Student = mongoose.model("Student", studentSchema);



const studentProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gpa: {
    type: Number,
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
  school: {
    type: String,
    required: true
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
