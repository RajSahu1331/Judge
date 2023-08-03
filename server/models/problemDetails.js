const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProblemSchema = new Schema({
    title:{
        type: String,
        // required : [true, 'Please write the Problem Name'],
        unique : true,
    },
    description:{
        type : String,
        // required : [true, 'Please describe the Problem'],
    },
    difficulty:{
        typr:String,
        enum :['easy', 'medium', 'hard'],
        // required : [true, 'Please describe the Difficulty'],
    },
    
},{timestamps : true})

const problem = mongoose.model('problemDetails', ProblemSchema)

module.exports = problem