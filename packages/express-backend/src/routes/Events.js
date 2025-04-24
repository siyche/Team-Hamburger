import express from 'express';
import { authenticateUser } from './Auth.js';
import User from '../models/user.js';
import Calendar from '../models/Calendar.js';
import Event from '../models/Event.js';

const router = express.Router();

// Create a new event
router.post('/events', authenticateUser, async (req, res) => {
  try {
    const email = req.user.email;
    const eventData = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user || !Array.isArray(user.calendars) || user.calendars.length === 0) {
      return res.status(404).json({ error: 'User or calendars not found.' });
    }

    // Persist the new Event
    const newEvent = new Event(eventData);
    await newEvent.save();

    // Attach to the first calendar
    const calendarId = user.calendars[0];
    const calendar = await Calendar.findById(calendarId);
    if (!calendar) {
      return res.status(404).json({ error: 'Calendar not found.' });
    }
    if (!Array.isArray(calendar.events)) {
      calendar.events = [];
    }
    calendar.events.push(newEvent._id);
    await calendar.save();

    return res.status(201).json(newEvent);
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

// Get all events for the first calendar
router.get('/events', authenticateUser, async (req, res) => {
  try {
    const email = req.user.email;

    // Populate calendars and nested events
    const user = await User.findOne({ email }).populate({
      path: 'calendars',
      populate: { path: 'events' }
    });
    if (!user || !Array.isArray(user.calendars) || user.calendars.length === 0) {
      return res.status(404).json({ error: 'User or calendars not found.' });
    }

    const events = Array.isArray(user.calendars[0].events)
      ? user.calendars[0].events
      : [];
    return res.status(200).json(events);
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;