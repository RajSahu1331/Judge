const express = require("express");

const {
  runHandler,
  runStatusHandler,
  submitHandler,
  submitStatusHandler,
  deleteJob,
  getAllSubmissions,
  getJobInfo,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/run", runHandler);
router.get("/status", runStatusHandler);
router.post("/submit", submitHandler);
router.get("/submit/status", submitStatusHandler);
router.delete("/deleteJob", deleteJob);
router.get("/submission/:problemName", getAllSubmissions);
router.get("/getJobInfo/:id", getJobInfo);
module.exports = router;
