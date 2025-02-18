import mongoose from 'mongoose';

const flagSchema = new mongoose.Schema(
  {
    flagname: { 
        type: String, 
        required: true 
    },
  },
  { versionKey: false }
);

const Flag = mongoose.model('Flag', flagSchema);

export default Flag; 