import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  recipient_email: { type: String, required: true },
  email_body: { type: String, required: true },
  send_at: { type: Date, required: true },
  sent: { type: Boolean, default: false },
});

const Reminder = mongoose.model("Reminder", reminderSchema);

export default Reminder;
