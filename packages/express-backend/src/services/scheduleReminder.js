import Reminder from "../models/reminder";

export async function scheduleReminder(recipient_email, email_body, send_at) {
  await Reminder.create({
    recipient_email,
    email_body,
    send_at,
  });
}
