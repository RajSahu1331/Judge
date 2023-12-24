const express = require("express");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

dotenv.config();

const port = process.env.PORT;

// Connecting Database

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected Successfully"))
  .catch((err) => {
    console.error(err);
  });

//MiddleWare
app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Available Routes
app.use("/api/user", require("./routes/authentication"));
app.use("/api/problems", require("./routes/problem"));
app.use(require("./routes/jobRoute.js"));

// Setting the port

app.listen(port, () => {
  // generateFile("cpp", "hehe");
  console.log(`Backend Started`);
});
