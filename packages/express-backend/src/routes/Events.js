import Calendar from "../models/Calendar.js";
import { authenticateUser } from "./Auth.js";
import express from "express";
import cors from "cors";
import User from "../models/user.js";
import Event from "../models/Event.js";

const router = express.Router();
router.use(cors());
router.use(express.json());

router.post("/", authenticateUser, async (req, res) => {
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

router.get("/", authenticateUser, async (req, res) => {
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

router.delete("/:id", authenticateUser, async(req, res) => {
  // TODO: the event needs to be deleted from the calendar array as well
  const { id } = req.params;
  console.log("Deleting event with ID:", id);
  
  if (!id) {
    return res.status(400).json({ error: "Event ID is required." });
  }
  try {
    const deletedEvent = await Event.findOneAndDelete({
      _id: id,
      owner: req.user._id 
    });
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    // Now remove this event’s ID from the user’s calendar
    const email = req.user.email;
    const user = await User.findOne({ email }).populate('calendars');
    const calendar = user.calendars[0]; // assuming single calendar
    const eventIndex = calendar.events.indexOf(id);
    if (eventIndex > -1) {
      calendar.events.splice(eventIndex, 1);
      await calendar.save();
    }

    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
});

router.put('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  console.log("Updating event with ID:", id);
  // follows same logic in POST event, but updates event by ID 
  try {
    const updatedEventData = req.body;

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: id, owner: req.user._id },
      updatedEventData,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.status(200).json({message: "Event updated successfully.", event: updatedEvent});
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

export default router;