const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const eventController = require("../controllers/event/eventController.js");

// GET EVENTS
router.get("/events", eventController.getEvent);

// GET 1 EVENT
router.get("/events/:id", eventController.getEvent);

// CREATE EVENTS
router.post("/create-event", eventController.createEvent);

module.exports = router;
