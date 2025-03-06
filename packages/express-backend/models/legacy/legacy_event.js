// Event.js
import mongoose from 'mongoose';
import Flag from './Flag.js';

const prioritySchema = new mongoose.Schema({
  amount: { type: Number },
  label: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'] }
});

const eventSchema = new mongoose.Schema({
  // eid is assumed to be MongoDB's _id (ObjectId), no separate field needed
  date: { type: Date, required: true }, // Renamed from current_date to match UML
  flags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flag' }],
  visible: { type: Boolean, default: true },
  priority: prioritySchema
}, { discriminatorKey: 'eventType', versionKey: false });

eventSchema.statics.addEvent = function(eid, date, isTask) {
  // Since event_type includes Academic, interpret isTask as Regular vs. Task for simplicity
  const eventType = isTask ? 'Task' : 'Regular';
  // For Academic, use Academic.create() directly in application logic
  const eventData = {
    _id: eid, // Assuming eid can be an ObjectId
    date: date.toJSDate(),
    flags: [],
    visible: true,
    priority: { amount: 0, label: 'LOW' } // Default priority
  };
  return eventType === 'Task' ? Task.create(eventData) : Regular.create(eventData);
};

eventSchema.statics.rmEvent = function(eid) {
  return this.findByIdAndDelete(eid);
};

eventSchema.methods.setFlag = function(flag) {
  // Flag parameter is a Flag instance per UML
  if (!this.flags.includes(flag._id)) {
    this.flags.push(flag._id);
    return true;
  }
  return false;
};

eventSchema.methods.setVisible = function(visible) {
  this.visible = visible;
}

const Event = mongoose.model('Event', eventSchema);

// Regular Discriminator
const regularSchema = new mongoose.Schema({
  all_day: { type: Boolean, default: false },
  start_date: { type: Date },
  end_date: { type: Date },
  length: { type: Number }
});

regularSchema.methods.setAD = function(allDay) {
  this.all_day = allDay;
};

regularSchema.methods.setStart = function(startDate) {
  this.start_date = startDate.toJSDate();
};

regularSchema.methods.setEnd = function(endDate) {
  this.end_date = endDate.toJSDate();
};

regularSchema.methods.setLen = function(length) {
  this.length = length;
};

const Regular = Event.discriminator('Regular', regularSchema);

// Task Discriminator (moved from Task.js)
const taskSchema = new mongoose.Schema({
  date_created: { type: Date, required: true }, // Renamed from date_assigned
  deadline: { type: Date, required: true },     // Renamed from date_due
  in_progress: { type: Boolean, default: false },
  completed: { type: Boolean, default: false }
});

taskSchema.statics.addTask = function(event, dl, dd) {
  return Task.create({
    _id: event.eid,
    date: event.date.toJSDate(),
    flags: event.flags.map(f => f._id),
    visible: event.visible,
    priority: event.priority,
    date_created: dl.toJSDate(),
    deadline: dd.toJSDate()
  });
};

taskSchema.methods.setIP = function(inProgress) {
  this.in_progress = inProgress;
};

taskSchema.methods.setC = function(completed) {
  this.completed = completed;
};

taskSchema.methods.setDeadline = function(date) {
  this.deadline = date.toJSDate();
};

const Task = Event.discriminator('Task', taskSchema);

// Academic Discriminator
const courseNoSchema = new mongoose.Schema({
  dept: { type: String, enum: ['CSC', 'CPE', 'EE'], required: true },
  no: { type: Number, min: 1, max: 999, required: true }
});

const academicSchema = new mongoose.Schema({
  date_created: { type: Date, required: true },
  deadline: { type: Date, required: true },
  in_progress: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  course_no: courseNoSchema
});

academicSchema.methods.setIP = function(inProgress) {
  this.in_progress = inProgress;
};

academicSchema.methods.setC = function(completed) {
  this.completed = completed;
};

academicSchema.methods.setDeadline = function(date) {
  this.deadline = date.toJSDate();
};

const Academic = Event.discriminator('Academic', academicSchema);

export default Event;
export { Regular, Task, Academic };