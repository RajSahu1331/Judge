const userModel = require("../models/userDetails");

// handleUserLogin (Post Method) for checking existing User in DB
async function handleUserLogin(req, res) {
  try {
    const userData = req.body;
    const user = await userModel.checkLogin(userData.email, userData.password);
    const token = user.createToken(user._id);
    return res.status(200).json({ token, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}

// handleUserSignUp (Post Method) for adding new User in DB
async function handleUserSignUp(req, res) {
  try {
    const userData = req.body;
    await userModel.checkSignup(userData.email);

    const user = await userModel.create(userData);
    const token = user.createToken(userData._id);
    res.cookie("jwt", token, { maxAge: 24 * 60 * 60 * 1000 });
    return res.status(200).json({ token, success: true });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};

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
