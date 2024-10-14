const mongoose = require("mongoose");
const { float } = require("webidl-conversions");
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: BigInt,
    required: true
  },
  gpa: {
    type: float,
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
  }
}, {timestamps: true});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;