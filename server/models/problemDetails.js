const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProblemSchema = new Schema({
    title:{
        type: String,
        required : true,
    },
    Statement:{
        type : String,
        required : true,
    },
    difficulty:{
        typr:String,
        enum :['easy', 'medium', 'hard'],
        required : true,
    },
    examples:[{
        type:Object,
        input:{
            typr:String,
            required: true
        },
        output : {
            type:String,
            required: true,
        },
        explanation:{
            type:String,
        }
    }]
},{timestamps : true})

const problem = mongoose.model('problemDetails', ProblemSchema)

module.exports = problem