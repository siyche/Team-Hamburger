// User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    //username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    calendars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Calendar" }],
}, { versionKey: false });

const User = mongoose.model("User", userSchema);
export default User;

/* BUGS: 
- "Today" button doesn't work as intended 
- Capitalization matters in email

TODO: 
- Add robust password requirements 
- Add login with Google 
- Remove user data with account deletion 
- Add "Welcome, <name>" message 
- UI consistency changes 
- Automatically refresh when token expires 
- Automatically refresh events tab after submitting form 
*/