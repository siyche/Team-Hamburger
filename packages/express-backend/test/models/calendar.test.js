import mongoose from "mongoose";
import Calendar from "../../src/models/calendar.js";
import User from "../../src/models/user.js";

describe("Calendar Model Tests", () => {
  test("should create a calendar with owner and name", async () => {
    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123",
      calendars: [],
    });
    const cal = await Calendar.create({
      _ownerid: user._id,
      name: "Work Calendar",
      description: "Calendar for work events",
    });
    expect(cal._ownerid.toString()).toBe(user._id.toString());
    expect(cal.name).toBe("Work Calendar");
    expect(cal.description).toBe("Calendar for work events");
  });

  test("should fail to create calendar without ownerid", async () => {
    await expect(Calendar.create({ name: "No Owner" })).rejects.toThrow();
  });

  test("should fail to create calendar without name", async () => {
    const userId = new mongoose.Types.ObjectId();
    await expect(Calendar.create({ _ownerid: userId })).rejects.toThrow();
  });

  test("should allow adding dates and event IDs", async () => {
    const userId = new mongoose.Types.ObjectId();
    const cal = await Calendar.create({
      _ownerid: userId,
      name: "Test Calendar",
    });
    const date1 = new Date("2024-01-01");
    const eventId = new mongoose.Types.ObjectId();

    cal.dates.push(date1);
    cal.events.push(eventId);
    await cal.save();

    const found = await Calendar.findById(cal._id);
    expect(found.dates).toEqual([date1]);
    expect(found.events.map((id) => id.toString())).toEqual([
      eventId.toString(),
    ]);
  });
});
