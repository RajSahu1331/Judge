const Queue = require("bull");
const moment = require("moment");
const Job = require("./models/Job");
const { executeCpp } = require("./executeCpp");
const { executePython } = require("./executePython");

const jobQueue = new Queue("job-queue");
const NUM_WORKERS = 2;

jobQueue.process(NUM_WORKERS, async ({ data }) => {
  const { id: jobId } = data;
  const job = await Job.findById(jobId);

  if (job === undefined) {
    throw Error(`Cannot find job with ${jobId}`);
  }

  let output;
  try {
    job["startedAt"] = new Date();
    if (job.language === "cpp") {
      output = await executeCpp(job.filePath, job.userInput);
    } else if (job.language === "py") {
      output = await executePython(job.filePath, job.userInput);
    }
    job["completedAt"] = new Date();

    // Convert the output to a string explicitly
    job["output"] = output.error
      ? JSON.stringify(output.message)
      : output.message.toString();

    job["status"] = "success";
    console.log("output", output);
    await job.save();
  } catch (err) {
    job["completedAt"] = new Date();
    job["output"] = JSON.stringify(err);
    console.log("err", err);
    job["status"] = "error";
    await job.save();
  }
  return true;
});

jobQueue.on("failed", (error) => {
  console.log(error.data.id, "failed", error.failedReason);
});

const addJobToQueu = async (jobId) => {
  await jobQueue.add({ id: jobId });
};

module.exports = {
  addJobToQueu,
};
