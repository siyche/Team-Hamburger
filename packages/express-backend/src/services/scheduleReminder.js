import Reminder from "../models/reminder";

export async function scheduleReminder(recipient_email, email_body, send_at) {
  await Reminder.create({
    recipient_email,
    email_body,
    send_at,
  });
}

// ALEX TO-DO:
// update existing put/post/delete/etc. routes in Events.js to include reminder data type operations
