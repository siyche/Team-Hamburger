require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./src/models/Event'); // adjust path if needed

async function insertSampleEvent() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const newEvent = await Event.create({
      date: new Date('2025-04-10'),
      all_day: true,
      start_date: new Date('2025-04-10T09:00:00'),
      end_date: new Date('2025-04-10T17:00:00'),
      length: 480,
      priority: { amount: 1, label: 'HIGH' },
    });

    console.log('Inserted event:', newEvent);
    mongoose.disconnect();
  } catch (err) {
    console.error('Error inserting event:', err);
  }
}

insertSampleEvent();