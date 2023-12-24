const Job = require("../models/Job");
const fs = require("fs");
const {
  generateFile,
  deleteFile,
  generateOutputFile,
} = require("../generateFile");

const { addJobToQueu } = require("../jobQueue");
const { findById } = require("../models/userDetails");
const { isUtf8 } = require("buffer");

const runStatusHandler = async (req, res) => {
  const jobId = req.query.id;
  console.log("jobId", jobId);
  if (!jobId) {
    return res.status(400).json({ success: false, msg: "Id is not given" });
  }

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(400).json({ success: false, msg: "Invalid id" });
    }

    // Check if job.output exists before converting to string
    const jobOutputAsString = job.output ? job.output.toString() : "";

    res
      .status(200)
      .json({ success: true, msg: "Valid response", job: jobOutputAsString });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const runHandler = async (req, res) => {
  const { problemName, language = "cpp", code, userInput } = req.body;

  if (code === undefined || !code) {
    return res.status(400).json({ success: false, error: "Code is not given" });
  }
  let job;

  try {
    const filePath = await generateFile(language, code);
    job = await new Job({ problemName, language, filePath, userInput }).save();
    // console.log(job);
    const jobId = job["_id"];
    addJobToQueu(jobId);
    res.status(201).json({ success: true, jobId });
  } catch (err) {
    return res.status(400).json({ success: false, err: JSON.stringify(err) });
  }
};

const submitHandler = async (req, res) => {
  const { problemName, language = "cpp", code } = req.body;

  fs.readFile(
    `./problemInput/${problemName}.txt`,
    "utf-8",
    async (err, data) => {
      if (err) {
        return res
          .status(400)
          .json({ success: false, error: "Error reading user input" });
      }

      const userInput = data.toString();
      // console.log(typeof userInput);

      if (code === undefined || !code) {
        return res
          .status(400)
          .json({ success: false, error: "Code is not given" });
      }

      let job;

      try {
        const filePath = await generateFile(language, code);
        job = await new Job({
          problemName,
          language,
          filePath,
          userInput,
        }).save();
        const jobId = job["_id"];
        addJobToQueu(jobId);
        res.status(201).json({ success: true, jobId });
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, err: JSON.stringify(err) });
      }
    }
  );
};

const submitStatusHandler = async (req, res) => {
  const jobId = req.query.id;
  if (!jobId) {
    return res.status(400).json({ success: false, msg: "Id is not given" });
  }

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(400).json({ success: false, msg: "Invalid id" });
    }

    // Check if job.output exists before converting to string
    const jobOutputAsString = job.output ? job.output.toString() : "";

    let outputStr;
    if (job.language === "cpp") {
      outputStr = jobOutputAsString.slice(0, -2).replace(/\r\n/g, "_");
    } else {
      outputStr = jobOutputAsString.replace(/(\r\n|\n|\r)/gm, "_");
    }

    fs.readFile(
      `./problemOutput/${job.problemName}.txt`,
      "utf-8",
      async (err, data) => {
        if (err) {
          return res
            .status(400)
            .json({ success: false, error: "Error reading user input" });
        }
        reqOutput = data.toString().replace(/(\r\n|\n|\r)/gm, "_");

        console.log(outputStr);
        console.log("--------");
        console.log(reqOutput);

        if (reqOutput === outputStr) {
          await Job.updateOne(
            { _id: jobId }, // Filter to find the job by its ID
            { verdict: "correct" } // Update the verdict field
          );
        } else {
          await Job.updateOne(
            { _id: jobId }, // Filter to find the job by its ID
            { verdict: "wrong" } // Update the verdict field
          );
        }
        // await deleteFile(url1);
        // Send the response after processing the file
        res.status(200).json({
          success: true,
          msg: "Valid response",
          job: jobOutputAsString,
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const deleteJob = async (req, res) => {
  try {
    const id = req.body.id;
    const jobToDelete = await Job.findById(id);
    console.log("fliepath", jobToDelete["filePath"]);
    await deleteFile(jobToDelete["filePath"]);
    await Job.findByIdAndDelete(id);

    return res.status(200).json({ message: "Job Successfully Deleted!!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
};

const getJobInfo = async (req, res) => {
  const id = req.params.id;
  try {
    const job = await Job.findById(id);

    if (!job) {
      return res.status(400).json({ success: false, msg: "Invalid id" });
    }
    const file1 = fs.readFileSync(job.filePath, {
      encoding: "utf8",
      flag: "r",
    });
    return res.status(200).json(file1);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "bad request" });
  }
};

const getAllSubmissions = async (req, res) => {
  const problemName = req.params.problemName;
  try {
    const submissions = await Job.find({ problemName: problemName });
    return res.status(200).json(submissions);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  runHandler,
  runStatusHandler,
  submitHandler,
  submitStatusHandler,
  deleteJob,
  getAllSubmissions,
  getJobInfo,
};
