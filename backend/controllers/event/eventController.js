// import removeImg from "../utils/common.js";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("../../models/eventSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// get func
exports.getEvent = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed!",
      errorMessage: errors.array(),
    });
  }

  Event.find()
    .then((events) => {
      return res.status(200).json({ events });
    })
    .catch((error) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong.",
      });
    });
};

// create func
exports.createEvent = (req, res, next) => {
  const {
    title,
    place,
    description,
    date,
    time,
    ga_quantity,
    ga_price,
    vip_quantity,
    vip_price,
  } = req.body;

  const profile_image = req.file;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed!",
      errorMessage: errors.array(),
    });
  }

  Event.create({
    title,
    place,
    description,
    date,
    time,
    ga_quantity,
    ga_price,
    vip_quantity,
    vip_price,
    profile_image:
      "https://img.freepik.com/free-photo/enjoying-street-food-fest_23-2151543819.jpg?t=st=1721111833~exp=1721115433~hmac=b7fdfac5a44bd428827908b90079724c5c337d40da904cb761854e2a768bc1a5&w=826",
  })
    .then(() => {
      return res.status(201).json({
        message: "Event Created Successfully.",
      });
    })
    .catch((error) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong.",
      });
    });
};

// get 1 func
exports.getSigleEvent = (req, res, next) => {
  const { id } = req.params;

  Event.findById(id)
    .then((event) => {
      return res.status(200).json({ event });
    })
    .catch((error) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong.",
      });
    });
};
