import express from "express";
import passport from "passport";
import { getLoggedInUser } from "../controllers/userController.js";

const express = require("express");
const passport = require("passport");
const getLoggedInUser = require("../controllers/userController.js");

const router = express.Router();

router.get("/", passport.authenticate("jwt"), getLoggedInUser);

export default router;
