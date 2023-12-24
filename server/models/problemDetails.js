const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProblemSchema = new Schema(
  {
    title: {
      type: String,
      // required : [true, 'Please write the Problem Name'],
      unique: true,
    },
    description: {
      type: String,
      // required : [true, 'Please describe the Problem'],
    },
    examples: [{ input: String, output: String, explanation: String }],
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      // required : [true, 'Please describe the Difficulty'],
    },
    // problemInput: {
    //   type: Array,
    //   default: [],
    // },
  },
  { timestamps: true }
);

const problem = mongoose.model("problemDetails", ProblemSchema);

module.exports = problem;
