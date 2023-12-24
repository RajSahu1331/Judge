const mongoose = require("mongoose");
const { Schema } = mongoose;

const JobSchema = new Schema({
  problemName: {
    type: String,
    required: true,
  },
  verdict: {
    type: String,
    default: "None",
  },
  language: {
    type: String,
    required: true,
    enum: ["cpp", "py", "java"],
  },
  filePath: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  startedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "success", "error", "wrong"],
  },
  output: {
    type: String,
  },
  userInput: {
    type: String,
  },
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
