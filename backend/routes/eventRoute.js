const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const eventController = require("../controllers/event/eventController.js");

// GET EVENTS
router.get("/events", eventController.getEvent);

// GET 1 EVENT
router.get("/events/:id", eventController.getSigleEvent);

// User's events
router.post("/myevents", eventController.getUserEvent);

// CREATE EVENTS
router.post("/create-event", eventController.createEvent);

// Update events
router.put("/edit", eventController.updateNote);

// Delete Event
router.post("/delete/:id", eventController.deleteEvent);

module.exports = router;
