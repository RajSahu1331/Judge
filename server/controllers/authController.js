const User = require("../models/userDetails");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

// signup
const signupUser = async (req, res) => {
  const { name, email, password, role = "User" } = req.body;

  console.log(name, email, password, role);

  try {
    const user = await User.signup(name, email, password, role);
    console.log(user);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
5;
// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//logout
// Assuming this function is triggered when the user logs out
const logoutUser = async (req, res) => {
  try {
    // Clear the JWT token stored in local storage
    res.clearCookie("jwtToken"); // This line is for server-side cookies, not client-side local storage
    // For client-side local storage, you can do this:
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET userName

const getUser = async (req, res) => {
  const { email } = req.params; // Destructure the email property from req.params
  console.log("email", email);

  try {
    const user = await User.findOne({ email: email });
    const userName = user ? user.userName : null;
    console.log("userName", userName);
    res.status(200).json(userName);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  logoutUser,
  getUser,
};
