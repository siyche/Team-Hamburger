import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        trim: true 
    },
    password: { 
        type: String, 
        required: true, 
        trim: true 
    },
    calendars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Calendar' }],
  },
  { versionKey: false }
);

const User = mongoose.model('User', userSchema);

export default User; 