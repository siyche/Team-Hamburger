import Reminder from "../models/reminder.js";
import sendEmail from "./emailer.js";

// how long in between polling:
const POLL_INTERVAL = 5 * 60 * 1000; // 5 minutes
const subjectMessage = "Event Reminder";

// used to send timed emails to remind users of upcoming events
async function pollReminders() {
  console.log("✅ Polling for reminders is active"); // so we know it's working

  const now = new Date();

  const reminders = await Reminder.find({
    send_at: { $lte: now }, // $lte means "less than or equal to"
    sent: false,
  });

  for (const reminder of reminders) {
    try {
      sendEmail(reminder.recipient_email, reminder.email_body, subjectMessage);

      reminder.sent = true;
      await reminder.save();

      console.log(`Sent reminder to ${reminder.recipient_email}`);
    } catch (err) {
      console.error(`Failed to send to ${reminder.recipient_email}`, err);
    }
  }
}

// Run every 5 minutes
setInterval(pollReminders, POLL_INTERVAL);

// Also run immediately when the server starts
pollReminders();
