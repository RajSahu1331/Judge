const Problem = require("../models/problemDetails");

const getProblem = async (req, res) => {
  try {
    const { _id } = req.params;
    const problem = await Problem.findById(_id);
    // console.log(problem);
    return res.status(200).json({ problem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ eroor: error.message });
  }
};

const getProblemsList = async (req, res) => {
  try {
    const problems = await Problem.find();
    return res.status(200).json(problems);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const addProblem = async (req, res) => {
  try {
    const ProblemData = req.body;
    const problemReq = await Problem.create(ProblemData);
    return res.status(200).json({ problemReq });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateAProblem = async (req, res) => {
  try {
    const { _id } = req.params;
    const problemData = req.body;
    const problem = await Problem.findByIdAndUpdate(_id, problemData, {
      new: true,
    });
    return res.status(200).json({ problem });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteAProblem = async (req, res) => {
  try {
    const _id = req.params._id;
    // console.log(_id);
    await Problem.findByIdAndDelete(_id);
    return res.status(200).json({ message: "Problem Successfully Deleted!!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProblem,
  addProblem,
  deleteAProblem,
  updateAProblem,
  getProblemsList,
};
