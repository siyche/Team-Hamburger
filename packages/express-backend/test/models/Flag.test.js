import mongoose from 'mongoose';
import Flag from '../../src/models/flag.js';

describe('Flag Model Tests', () => {
  test('should create a flag with a name', async () => {
    const flag = await Flag.create({ flagname: 'urgent' });
    expect(flag.flagname).toBe('urgent');
  });

  test('should fail to create a flag without flagname', async () => {
    await expect(Flag.create({})).rejects.toThrow();
  });

  test('static addFlag should create a flag', async () => {
    const flag = await Flag.addFlag('important');
    expect(flag.flagname).toBe('important');
  });

  test('static removeFlag should delete the flag', async () => {
    await Flag.create({ flagname: 'temp' });
    const result = await Flag.removeFlag('temp');
    // removeFlag returns { deletedCount }
    expect(result.deletedCount).toBe(1);
  });
});