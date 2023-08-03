const mongoose = require('mongoose')

const Schema = mongoose.Schema

// const { isEmail } = require('validator')


// For Hashing the password of the user

const bcrypt = require('bcrypt')


// Designing the User Schema

const UserSchema = new Schema({
    userName:{
        type : String,
        required : [true, 'Please enter your User Name'],
        unique : true,
    },
    email:{
        type : String,
        required : [true, 'Please enter an Email ID'],
        unique : true,
        lowercase : true,
        // validate : [isEmail, 'Please enter a valid Email ID'],
    },
    password :{
        type : String, 
        required :[true, 'Please enter a password'],
        minlength: [6, 'Minimum password length should be 6'],
    },
    role:{
        type: String,
        required : true,
    }

}, {timestamps : true})


// Salting the password before saving it in DataBase

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.gensalt()
    this.password = await bcrypt.hash(this.password, salt)
    next() 
})

// Static method to login user

UserSchema.statics.login = async function(email, password,){
    const user = await this.findOne({ email })
    if(user)
    {
        const auth = await bcryt.compare(password, user.password)
        if(auth)
        {
            return user
        }
        throw Error('Incorrect PassWord')
    }
    else throw Error('Incorrect Email ID') 

}

const User = mongoose.model('userDetails', UserSchema)
module.exports = User