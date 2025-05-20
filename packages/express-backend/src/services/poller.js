import Reminder from "./reminder.js";
import sendEmail from "./emailer.js";

// how long in between polling:
const POLL_INTERVAL = 5 * 60 * 1000; // 5 minutes

async function pollReminders() {
  console.log("✅ Polling for reminders is active"); // so we know it's working

  const now = new Date();

  const reminders = await Reminder.find({
    send_at: { $lte: now }, // $lte means "less than or equal to"
    sent: false,
  });

  for (const reminder of reminders) {
    try {
      await sendEmail(reminder.recipientEmail, reminder.emailBody);

      reminder.sent = true;
      await reminder.save();

      console.log(`Sent reminder to ${reminder.recipientEmail}`);
    } catch (err) {
      console.error(`Failed to send to ${reminder.recipientEmail}`, err);
    }
  }
}

// Run every 5 minutes
setInterval(pollReminders, POLL_INTERVAL);

// Also run immediately when the server starts
pollReminders();
