const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const { boolean } = require("webidl-conversions");
const Schema = mongoose.Schema;


const userSchema = new Schema({
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
  },
  studentProfile: {
    type: Schema.Types.ObjectId,
    ref: "StudentProfile"
  },
  educatorProfile: {
    type: Schema.Types.ObjectId,
    ref: "EducatorProfile"
  }
}, {timestamps: true});


// Mongoose hooks
// before document has been saved
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// Method to log in user
userSchema.statics.login = async function(email, password) {
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

const User = mongoose.model("User", userSchema);



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
  schoolYear: {
    type: Number,
    required: true,
    validate: {
      validator: year => {
        return year >= 6 && year <= 12;
      },
      message:
        "Please enter a valid school year! (6-12)"
    }
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
  educator: {
    type: Schema.Types.ObjectId,
    ref: "EducatorProfile"
  },
  profile: {
    type: String
  },
  interests: {
    type: [String]
  },
  credentials: {
    type: Schema.Types.ObjectId,
    ref: "User",    // Reference to the linked credentials
    required: true
  }
});

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);



const educatorProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  students: {
    type: [Schema.Types.ObjectId],
    ref: "StudentProfile",    // Reference to linked students
  },
  classId: {
    type: String,
    unique: true,
    required: true
  },
  credentials: {
    type: Schema.Types.ObjectId,
    ref: "User",    // Reference to the linked credentials
    required: true
  }
});

const EducatorProfile = mongoose.model("EducatorProfile", educatorProfileSchema);


module.exports = {
  User,
  StudentProfile,
  EducatorProfile
};
