import { authenticateUser } from "./Auth.js";
import express from "express";
import cors from "cors";
import User from "../models/user.js";
import Event from "../models/event.js";

const router = express.Router();
router.use(cors());
router.use(express.json());

router.post("/events", authenticateUser, async (req, res) => {
    try {
        const email = req.user.email; // get user email
        console.log("User email:", email);
        const user = await User.findOne({ email }).populate("calendars"); // find user by email and populate calendars

        if (!user || user.calendars.length === 0) {
            return res
                .status(404).json({ error: "User or calendars not found." });
        }

        const calendar = user.calendars[0]; // get first calendaer by default (in future, change)
        const eventData = req.body; // get event data from request body

        const newEvent = new Event(eventData)
        await newEvent.save();

        calendar.events.push(newEvent._id);
        await calendar.save();
    
        res.status(201).json(newEvent);

    } catch (error) {
        console.error("Event creation error:", error);
        res.status(500).json({ error: "Internal server error." });
      } 
});

router.get("/events", authenticateUser, async (req, res) => {
  try {
    const email = req.user.email;
    console.log("User found for get events api:", email);

    // Find the user by email and populate the calendars and events
    const user = await User.findOne({ email }).populate({
      path: "calendars",
      populate: {
        path: "events",
      },
    });

    // Check if the user and calendars exist
    if (!user || user.calendars.length === 0) {
      return res.status(404).json({ error: "User or calendars not found." });
    }

    // Get the first calendar and its events
    const calendar = user.calendars[0];
    const events = calendar.events || [];

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;