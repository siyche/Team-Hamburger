// Calendar.js
import mongoose from "mongoose";

const calendarSchema = new mongoose.Schema(
  {
    _ownerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dates: [Date],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
  },
  { versionKey: false }
);

const Calendar = mongoose.model("Calendar", calendarSchema);

export default Calendar;
