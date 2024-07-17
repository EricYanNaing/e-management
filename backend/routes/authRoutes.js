const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const User = require("../models/authSchema");
const authController = require("../controllers/auth/authController");

// GET EVENTS
router.get("/users", authController.getUsers);

// GET 1 EVENT
router.get("/users/:id", authController.getSigleUser);

// CREATE Users
router.post(
  "/create-user",
  [
    body("name")
      .trim()
      .isLength({ min: 3 })
      .withMessage("User Name is too short."),
    body("email").isEmail().withMessage("Email is invalid."),
    body("password")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Password is too short.")
      .isLength({ max: 15 })
      .withMessage("Password is too long."),
  ],
  authController.createUser
);

// Update events
router.put("/edit", authController.updateUser);

// BOOK EVENT
router.post("/bookevent", authController.bookEvent);

// GET User's events
router.post("/bookedevents", authController.getBookedEvents);

// Delete Event
router.post("/delete/:id", authController.deleteUser);

// Login
router.post("/login", authController.login);

// Middle ware
router.get("/status", authController.authMiddleware);

module.exports = router;
