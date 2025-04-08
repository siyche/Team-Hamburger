import mongoose from 'mongoose';
import Event from '../legacy_event.js';

const taskSchema = new mongoose.Schema(
  {
    date_assigned: { 
        type: Date,
        required: true 
    },
    date_due: { 
        type: Date, 
        required: true 
    },
    in_progress: { type: 
        Boolean, default: 
        false 
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
  },
  { versionKey: false }
);

const Task = Event.discriminator('Task', taskSchema);

export default Task; 