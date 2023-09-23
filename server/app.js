const express = require("express");
const path = require("path");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const helmet = require("helmet");

// Connecting Database

const url = "mongodb://localhost:27017/judge";
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected Successfully"))
  .catch((err) => {
    console.error(err);
  });

//MiddleWare
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "Codify",
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Available Routes
app.use("/api/auth", require("./routes/authentication"));
app.use("/api/problems", require("./routes/problem"));

// Setting the port
const port = 8000;
app.listen(port, () => {
  console.log(`Backend Started`);
});
