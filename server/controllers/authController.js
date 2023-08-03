const user = require('../models/userDetails')

// const jwt = require('jsonwebtoken')

// handleUserSignUp (Post Method) for adding new User in DB 
async function handleUserSignUp(req, res){
    const { userName, email, password, role} = req.body
    // console.log(userName);
    success = true
    try{
        const userName_Exist = user.findOne({userName})
        const email_Exist = user.findOne({email})
        // console.log(userName_Exist)
        if(userName_Exist){
            success = false
            return res.status(400).json({success, error:'Sorry , This userName already is being used'})
        } 
        if(email_Exist)
        {
            success = false
            return res.status(400).json({success, error:'Sorry , This email already is being used'})
        }
        const userData = await user.create({
        userName,
        email,
        password,
        role,
        })
        return res.status(201).json(userData)
    }
    catch(err)
    {
        console.error(err.message)
        res.status(500).send("Internal Server Error")
    }

}


// handleUserLogin (Post Method) for checking existing User in DB 
async function handleUserLogin(req, res)
{
    const { email, password} = req.body;
    const Registered_email = await user.findOne({email})
    const Registered_password = await user.findOne({password})
    
    try{
        if(!Registered_email)
        {
            success = false
            return res.status(400).json({success, error : 'This email is not Registered'})
        }
        if(!Registered_password)
        {
            success = false
            return res.status(400).json({success, error : 'This password is Incorrect'})
        }
        console.log(Registered_email)
        success = true
        return res.status(200).json({success , message: `Welcome, ${Registered_email.userName}` })
    }
    catch(err){
        console.error(err.message)
        res.status(500).send("Internal Server Error")

    }
}


async function UserLogin (req, res)
{
    const {email, password} = req.params
    try{
        if(!user.findOne(email))
        {
            success = false
            return res.status(400).json({success, error : 'This email is not Registered'})
        }
        if(!user.findOne(password))
        {
             success = false
            return res.status(400).json({success, error : 'This password is Incorrect'})
        }
        success = true
        return res.status(200).send({success, message : `Welcome, ${user.findOne(email).userName}`})
    }
    catch(err)
    {
        console.error(err.message)
        res.status(500).send("Internal Server Error")

    }
}


module.exports = {
    handleUserSignUp,
    handleUserLogin,
    UserLogin,
}





/* 
// Function for Hnadling Errors
const HandleError = (err) =>{
    let errors = {userName, email, password}

    // incorrect userName
    if(err.message === 'incorrect email')
    {
        errors.email = 'The email is not registered'
    }

    // incorrect password
    if(err.message === 'incorrect passwrod')
    {
        errors.password = 'The password is Incorrect'
    }

    // duplicate userName error



    // duplicate email error

    if(err.code === 11000){
        errors.email = 'this email is already registered'
        return errors
    }

}*/