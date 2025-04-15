//Darryl's TODOS
// 1. Look at schemas for events and tasks and rework the form from the frontend to make sure the backend gets the expected data types

// 2. Create the routes for creating a task and event. This will require a get route and a post route
    // 2a. Options to Delete and Update Tasks and events will require a different api route and consequently a new issue

// 3. After finishing the task and event creation and get routes, then we will need to work on writing the handleSubmit function for the form
    // 3a. Double check that we do get token data (email) from the frontend that is sent to the backend as to tie the type of events/task to a user
    
// 4. Write Tests for the routes

import authenticateUser from "./Auth.js";
import express from "express";
import cors from "cors";
import User from "../models/user.js";
import Event from "../models/event.js";

const router = express.Router();
router.use(cors());
router.use(express.json());

router.post("/events", authenticateUser, async (req, res) => {
    try {
        const email = req.user || {}; // get user email
        const user = await User.findOne({ email }).populate("calendars"); // find user by email and populate calendars

        if (!user || user.calendars.length === 0) {
            return res
                .status(404).json({ error: "User or calendars not found." });
        }

        const calendar = user.calendars(0); // get first calendaer by default (in future, change)
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
   
export default router;