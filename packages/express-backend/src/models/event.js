import mongoose from "mongoose";

// Define embedded schemas
const prioritySchema = new mongoose.Schema({
  amount: { type: Number },
  label: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'] },
});

const courseNoSchema = new mongoose.Schema({
  dept: { type: String, enum: ['CSC', 'CPE', 'EE'] },
  no: { type: Number, min: 1, max: 999 },
});

// Unified Event schema
const eventSchema = new mongoose.Schema({
  // Common fields
  date: { type: Date, required: true },
  flags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flag' }],
  visible: { type: Boolean, default: true },
  priority: prioritySchema,
  title: { type: String, required: true }, // NEW -> to support adding titles for easy identitification of event
  details: { type: String }, // not required (optional)

  // Regular-specific fields (optional)
  all_day: { type: Boolean },
  start_date: { type: Date },
  end_date: { type: Date },
  length: { type: Number },
  

  // Task-specific fields (optional)
  date_created: { type: Date },
  deadline: { type: Date },
  in_progress: { type: Boolean },
  completed: { type: Boolean },

  // Academic-specific field (optional)
  course_no: courseNoSchema,
}, { versionKey: false });

// Virtual to infer event type
eventSchema.virtual('eventType').get(function () {
  if (this.course_no) {
    return 'Academic';
  } else if (this.date_created && this.deadline) {
    return 'Task';
  } else {
    return 'Regular';
  }
});

// Type-specific methods with runtime checks
eventSchema.methods.setAD = function (allDay) {
  if (this.eventType === 'Regular') {
    this.all_day = allDay;
  } else {
    throw new Error('setAD can only be called on Regular events');
  }
};

eventSchema.methods.setIP = function (inProgress) {
  if (this.eventType === 'Task' || this.eventType === 'Academic') {
    this.in_progress = inProgress;
  } else {
    throw new Error('setIP can only be called on Task or Academic events');
  }
};

eventSchema.methods.setDeadline = function (date) {
  if (this.eventType === 'Task' || this.eventType === 'Academic') {
    this.deadline = date;
  } else {
    throw new Error('setDeadline can only be called on Task or Academic events');
  }
};

// Static methods for creating events
eventSchema.statics.addRegularEvent = function (data) {
  return this.create(data);
};

eventSchema.statics.addTaskEvent = function (data) {
  return this.create(data);
};

eventSchema.statics.addAcademicEvent = function (data) {
  return this.create(data);
};

// General method to remove an event
eventSchema.statics.rmEvent = async function (eid) {
  return this.findByIdAndDelete(eid);
};

// Export the model
const Event = mongoose.model("Event", eventSchema);
export default Event;