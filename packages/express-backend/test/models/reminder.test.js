import mongoose from "mongoose";
import Reminder from "../../src/models/reminder.js";

describe("Reminder Model Tests", () => {
  test("should create a Reminder with email, body, and send at fields", async () => {
    const date = new Date();
    const id = new mongoose.Types.ObjectId();
    const rem = await Reminder.create({
      recipient_email: "test@test.com",
      email_body: "This is a test",
      send_at: date,
      event_id: id,
    });
    expect(rem.recipient_email).toBe("test@test.com");
    expect(rem.email_body).toBe("This is a test");
    expect(rem.send_at).toBe(date);
    expect(rem.sent).toBe(false);
  });

  test("should fail to create Reminder without recipient_email", async () => {
    const date = new Date();
    const id = new mongoose.Types.ObjectId();
    await expect(
      Reminder.create({
        email_body: "No recipient email",
        send_at: date,
        event_id: id,
      })
    ).rejects.toThrow();
  });

  test("should fail to create calendar without email_body", async () => {
    const date = new Date();
    const id = new mongoose.Types.ObjectId();
    await expect(
      Reminder.create({
        recipient_email: "No email body",
        send_at: date,
        event_id: id,
      })
    ).rejects.toThrow();
  });

  test("should fail to create Reminder without send_at", async () => {
    const id = new mongoose.Types.ObjectId();
    await expect(
      Reminder.create({
        recipient_email: "test@test.com",
        email_body: "No send at",
        event_id: id,
      })
    ).rejects.toThrow();
  });

  test("should fail to create calendar without event_id", async () => {
    const date = new Date();
    await expect(
      Reminder.create({
        recipient_email: "test@test.com",
        email_body: "No event id",
        send_at: date,
      })
    ).rejects.toThrow();
  });
});
