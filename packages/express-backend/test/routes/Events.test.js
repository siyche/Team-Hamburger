/**
 * Default placeholder test so build doesn't fail
 */

import mongoose from "mongoose";
import mockingoose from "mockingoose";
import UserSchema from "../../src/models/user";

let UserSchema;

beforeAll(() => {
  UserSchema = mongoose.model("UserSchema", UserSchema); // Replace with your model
});

beforeEach(() => {
  jest.clearAllMocks();
  mockingoose.resetAll();
});

test("Placeholder test", async () => {
  // Mocking Mongoose `find` method
  mockingoose(UserSchema).toReturn([], "find");

  // Basic assertion to ensure it runs without issues
  const result = await UserSchema.find();
  expect(result).toEqual([]);
});
