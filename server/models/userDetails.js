const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

// Designing the User Schema

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your User Name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an Email ID"],
      unique: true,
      lowercase: true,
      // validate: [isEmail, "Please Enter a valid Email ID"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Minimum password length should be 6"],
    },
    role: {
      type: String,
      enum: ["User", "Admin", "Owner"],
      default: "User",
    },
  },
  { timestamps: true }
);
UserSchema.statics.signup = async function (userName, email, password, role) {
  try {
    if (!email || !password) throw Error("All fields required");
    if (!validator.isEmail(email)) throw Error("Invalid email");

    const exists = await this.findOne({ email });
    if (exists) throw Error("Email already registered");

    const userNameExists = await this.findOne({ userName });
    if (userNameExists) throw Error("Username already registered");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ userName, email, password: hash, role });

    return user; // Return the created user
  } catch (error) {
    throw Error(error.message); // Throw the caught error
  }
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All fields required");

  const user = await this.findOne({ email });
  if (!user) throw Error("Email not registered");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error("Incorrect password");

  return user;
};

const User = mongoose.model("userDetails", UserSchema);
module.exports = User;
