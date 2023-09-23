const express = require("express");

const {
  getProblem,
  addProblem,
  deleteAProblem,
  updateAProblem,
  getProblemsList,
} = require("../controllers/probController");

const router = express.Router();

router.get("/", getProblemsList);
router.get("/:_id", getProblem);
router.post("/add", addProblem);
router.put("/update/:_id", updateAProblem);
router.delete("/delete/:_id", deleteAProblem);

module.exports = router;
