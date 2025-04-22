

import CourseNo from '../../src/models/CourseNo.js';

describe('CourseNo Class Tests', () => {
  test('valid construction', () => {
    const c = new CourseNo('CSC', 101);
    expect(c.dept).toBe('CSC');
    expect(c.no).toBe(101);
  });

  test('invalid department throws', () => {
    expect(() => new CourseNo('MATH', 100)).toThrow('Department must be a department');
  });

  test('invalid number low throws', () => {
    expect(() => new CourseNo('CSC', 0)).toThrow('Number must be between 1 and 999');
  });

  test('invalid number high throws', () => {
    expect(() => new CourseNo('CPE', 1000)).toThrow('Number must be between 1 and 999');
  });

  test('toSchema returns correct object', () => {
    const c = new CourseNo('EE', 250);
    expect(c.toSchema()).toEqual({ dept: 'EE', no: 250 });
  });
});