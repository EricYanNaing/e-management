// import removeImg from "../utils/common.js";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Event = require("../../models/eventSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { removeImg } = require("../../utlis/remove_cv.js");
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

  const currentPage = req.query.page || 1;
  const perPage = 3;
  let totalEvents;
  let totalPages;

  Event.find()
    .countDocuments()
    .then((counts) => {
      totalEvents = counts;
      totalPages = Math.ceil(totalEvents / perPage);
      return Event.find()
        .sort({ createdAt: -1 })
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((events) => {
      return res.status(200).json({ events, totalEvents, totalPages });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Something went wrong!.",
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
    creater,
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
    creater,
    profile_image: profile_image ? profile_image.path : "",
  })
    .then(() => {
      return res.status(201).json({
        message: "Event Created Successfully.",
      });
    })
    .catch((error) => {
      console.log(error);
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
      return res.status(200).json(event);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({
        message: "Something went wrong.",
      });
    });
};

// get 1 func
exports.getUserEvent = (req, res, next) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  const currentPage = req.query.page || 1;
  const perPage = 5;
  let totalEvents;
  let totalPages;

  try {
    const userIdObject = new mongoose.Types.ObjectId(userId);

    Event.find({ creater: userIdObject })
      .countDocuments()
      .then((counts) => {
        totalEvents = counts;
        totalPages = Math.ceil(totalEvents / perPage);
        return Event.find({ creater: userIdObject })
          .skip((currentPage - 1) * perPage)
          .limit(perPage);
      })
      .then((events) => {
        if (!events) {
          return res
            .status(404)
            .json({ message: "No eventss found for this user" });
        }
        return res.status(200).json({ events, totalEvents, totalPages });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          message: "Something went wrong.",
        });
      });
  } catch (error) {
    return res.status(400).json({ message: "Invalid UserId format" });
  }
};

// update func
exports.updateNote = (req, res, next) => {
  const {
    _id,
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

  Event.findById(_id)
    .then((event) => {
      event.title = title;
      event.place = place;
      event.description = description;
      event.date = date;
      event.time = time;
      event.ga_quantity = ga_quantity;
      event.ga_price = ga_price;
      event.vip_quantity = vip_quantity;
      event.vip_price = vip_price;
      if (profile_image) {
        if (event.profile_image) {
          removeImg(event.profile_image);
        }
        event.profile_image = profile_image.path;
      }
      event.save();
    })
    .then((_) => {
      return res.status(200).json({
        message: "Event Updated successfully!",
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteEvent = (req, res, next) => {
  const { id } = req.params;
  Event.findById(id)
    .then((event) => {
      if (event.profile_image) {
        removeImg(event.profile_image);
      }
      return Event.findByIdAndDelete(id).then((_) => {
        res.status(202).json({
          message: "Event Deleted.",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        message: "Something went wrong.",
      });
    });
};
