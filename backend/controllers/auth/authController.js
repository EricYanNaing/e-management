// import removeImg from "../utils/common.js";
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../../models/authSchema.js");
const EVent = require("../../models/eventSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { removeImg } = require("../../utlis/remove_cv.js");
const { validationResult } = require("express-validator");

// get func
exports.getUsers = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed!",
      errorMessage: errors.array(),
    });
  }

  User.find()
    .then((events) => {
      return res.status(200).json({ events });
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({
        message: "Something went wrong.",
      });
    });
};

// create func
exports.createUser = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed!",
      errorMessage: errors.array(),
    });
  }

  const { name, email, password } = req.body;
  console.log(req.body);
  bcrypt
    .hash(password, 10)
    .then((hashPassword) => {
      return User.create({
        email,
        name,
        password: hashPassword,
      });
    })
    .then((result) => {
      res.status(201).json({
        message: `User is created! , UserId : ${result._id}`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: "Something went wrong!.",
      });
    });
};

// get 1 func
exports.getSigleUser = (req, res, next) => {
  // const { id } = req.params;
  // Event.findById(id)
  //   .then((event) => {
  //     return res.status(200).json(event);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(404).json({
  //       message: "Something went wrong.",
  //     });
  //   });
};

// update func
exports.updateUser = (req, res, next) => {
  // const {
  //   _id,
  //   title,
  //   place,
  //   description,
  //   date,
  //   time,
  //   ga_quantity,
  //   ga_price,
  //   vip_quantity,
  //   vip_price,
  // } = req.body;
  // const profile_image = req.file;
  // Event.findById(_id)
  //   .then((event) => {
  //     event.title = title;
  //     event.place = place;
  //     event.description = description;
  //     event.date = date;
  //     event.time = time;
  //     event.ga_quantity = ga_quantity;
  //     event.ga_price = ga_price;
  //     event.vip_quantity = vip_quantity;
  //     event.vip_price = vip_price;
  //     if (profile_image) {
  //       if (event.profile_image) {
  //         removeImg(event.profile_image);
  //       }
  //       event.profile_image = profile_image.path;
  //     }
  //     event.save();
  //   })
  //   .then((_) => {
  //     return res.status(200).json({
  //       message: "Event Updated successfully!",
  //     });
  //   })
  //   .catch((err) => console.log(err));
};

exports.deleteUser = (req, res, next) => {
  // const { id } = req.params;
  // Event.findById(id)
  //   .then((event) => {
  //     if (event.profile_image) {
  //       removeImg(event.profile_image);
  //     }
  //     return Event.findByIdAndDelete(id).then((_) => {
  //       res.status(202).json({
  //         message: "Event Deleted.",
  //       });
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(404).json({
  //       message: "Something went wrong.",
  //     });
  //   });
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed!",
        errorMessage: errors.array(),
      });
    }
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      return res.status(401).json({
        message: "Email  doesn't exist.",
      });
    }
    const isMatch = bcrypt.compareSync(password, userDoc.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Email or password doesn't match.",
      });
    }

    const token = jwt.sign(
      { email: userDoc.email, userId: userDoc._id },
      process.env.JWT_KEY,
      { expiresIn: "1hr" }
    );
    return res
      .status(200)
      .json({ token, userId: userDoc._id, user_mail: userDoc.email });
  } catch (err) {
    return res.status(401).json({
      message: "Email or password doesn't match.",
    });
  }
};

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "User is not authenticated." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const istokenmatch = jwt.verify(token, process.env.JWT_KEY);
    if (!istokenmatch) {
      return res.status(401).json({ message: "User is not authenticated." });
    }
    req.userId = istokenmatch.userId;
    res.json("ok");
    next();
  } catch {
    (err) => {
      return res.status(401).json({ message: "User is not authenticated." });
    };
  }
};

exports.bookEvent = async (req, res, next) => {
  const { userId, eventId, ticketType } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          bookedEvents: { eventId: eventId, ticketType: ticketType },
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Event booked successfully" });
  } catch (error) {
    console.error("Error booking event:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getBookedEvents = async (req, res, next) => {
  const { userId } = req.params;
  const currentPage = parseInt(req.query.page) || 1;
  const perPage = 2;

  try {
    const user = await User.findById(userId).populate("bookedEvents.eventId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalEvents = user.bookedEvents.length;
    const totalPages = Math.ceil(totalEvents / perPage);

    const paginatedBookedEvents = user.bookedEvents
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice((currentPage - 1) * perPage, currentPage * perPage);

    res.status(200).json({
      bookedEvents: paginatedBookedEvents,
      totalEvents,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching booked events:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
