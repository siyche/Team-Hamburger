import Priority from '../../src/models/Priority.js';

describe('Priority Class Tests', () => {
  test('constructor sets amount and label', () => {
    const p = new Priority(2, 'MEDIUM');
    expect(p.amount).toBe(2);
    expect(p.label).toBe('MEDIUM');
  });

  test('setPriority updates the amount', () => {
    const p = new Priority(1, 'LOW');
    p.setPriority(5);
    expect(p.amount).toBe(5);
  });

  test('setLabel accepts valid labels', () => {
    const p = new Priority(1, 'LOW');
    p.setLabel('HIGH');
    expect(p.label).toBe('HIGH');
  });

  test('setLabel throws on invalid label', () => {
    const p = new Priority(1, 'LOW');
    expect(() => p.setLabel('INVALID')).toThrow('Label must be HIGH, MEDIUM, or LOW');
  });

  test('toSchema returns correct object', () => {
    const p = new Priority(3, 'LOW');
    expect(p.toSchema()).toEqual({ amount: 3, label: 'LOW' });
  });
});