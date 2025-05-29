// Flag.js
import mongoose from "mongoose";

const flagSchema = new mongoose.Schema(
  {
    flagname: { type: String, required: true },
  },
  { versionKey: false }
);

flagSchema.statics.addFlag = function (flagname) {
  return this.create({ flagname });
};

flagSchema.statics.removeFlag = function (flagname) {
  return this.deleteOne({ flagname });
};

const Flag = mongoose.model("Flag", flagSchema);

export default Flag;
