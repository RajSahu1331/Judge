const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Function to convert constraints values to bold
const makeValuesBold = function (next) {
  // `this` refers to the current document being saved
  if (this.constraints) {
    // Regular expression to find all values within constraints
    const regex = /(?<=->\s)(.*?)(?=\s->|$)/g;
    // Replace values with bold HTML tags
    this.constraints = this.constraints.replace(regex, "<strong>$1</strong>");
  }
  next();
};

const ProblemSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    constraints: {
      type: String,
      defualt: "",
    },
    examples: [{ input: String, output: String, explanation: String }],
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
  },
  { timestamps: true }
);

// Apply middleware to format constraints values to bold before saving
ProblemSchema.pre("save", makeValuesBold);

const problem = mongoose.model("problemDetails", ProblemSchema);

module.exports = problem;
