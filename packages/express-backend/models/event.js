import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    current_date: { 
        type: Date, 
        required: true 
    },
    event_type: { 
        type: String, 
        enum: ['Regular', 'Task'], 
        required: true 
    },
    flags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flag' }],
    visible: { 
        type: Boolean, 
        default: true 
    }
}, { versionKey: false });

const Event = mongoose.model('Event', eventSchema);

export default Event; 