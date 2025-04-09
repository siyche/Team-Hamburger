// User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    //username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    calendars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Calendar" }],
  },
  { versionKey: false }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

/* ALEX— STEPS: 
- FRONTEND: 
- Send user info off to backend in the form of a Const 
- Await response. If valid, let them in. If not, display error. Response should return a token or False 
- BACKEND: 
- Specify API routes for login and sign-up. They should constuct User models with the given data and check the database. 
- Encrypt password, compare or add to database, and send back resulting token or error code/message. */
