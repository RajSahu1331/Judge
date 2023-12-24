// const UserModel = require("../models/userDetails");

// const getLoggedInUser = async (req, res) => {
//   try {
//     const _id = req.session.passport.user._doc._id;
//     const user = await UserModel.findById(_id);
//     return res.status(200).json({ user });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   getLoggedInUser,
// };
