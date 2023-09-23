const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

// Creating token
const maxAge = 24 * 60 * 60;
// maxAge is in Seconds
UserSchema.methods.createToken = function (id) {
  return jwt.sign({ id }, "Codify", {
    expiresIn: maxAge,
  });
};

// Static method to login user

UserSchema.statics.checkLogin = async function (email, password) {
  if (email) {
    const user = await this.findOne({ email });
    if (!user) throw new Error("User does not exist");

    // Check for the password

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new Error("Invalid Password");

    return user;
  }
};

UserSchema.statics.checkSignup = async function (email) {
  if (email) {
    const user = await this.findOne({ email });
    if (user) throw new Error("The email is already registered");
  }
  return false;
};

// Salting the password before saving it in DataBase

UserSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  // Generate bcrypt salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    // Hash the password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      //Assign Hashed Password
      user.password = hash;
      return next();
    });
  });
});

const User = mongoose.model("userDetails", UserSchema);
module.exports = User;
