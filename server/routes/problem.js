const express = require('express')

const {  findProblemByTitle, addProblem }  = require("../controllers/probController")


const router = express.Router()

router.get('/questions/:title', findProblemByTitle)

router.post('/questionForm', addProblem)

module.exports = router;
