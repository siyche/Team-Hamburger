// Date.js
class Date {
  constructor(year, month, day, hour = 0, minute = 0, second = 0) {
    this.year = year; // 0 <= x <= 10000
    this.month = month; // 1 <= x <= 12
    this.day = day; // 1 <= x <= 31
    this.hour = hour; // 0 <= x <= 23
    this.minute = minute; // 0 <= x <= 59
    this.second = second; // 0 <= x <= 59
  }

  static addDate(yr, mo, da) {
    return new Date(yr, mo, da);
  }

  static currentDate() {
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth() - 1, // JavaScript months are 0-based
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    );
  }

  specify(hour, minute, second) {
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  changeYear(year) {
    this.year = year;
  }

  changeMonth(month) {
    this.month = month;
  }

  changeDay(day) {
    this.day = day;
  }

  changeHour(hour) {
    this.hour = hour;
  }

  changeMinute(minute) {
    this.minute = minute;
  }

  changeSecond(second) {
    this.second = second;
  }

  // Utility to convert to JavaScript Date for database storage
  toJSDate() {
    return new Date(
      this.year,
      this.month - 1,
      this.day,
      this.hour,
      this.minute,
      this.second
    );
  }

  // Utility to create from JavaScript Date
  static fromJSDate(jsDate) {
    return new Date(
      jsDate.getFullYear(),
      jsDate.getMonth() + 1,
      jsDate.getDate(),
      jsDate.getHours(),
      jsDate.getMinutes(),
      jsDate.getSeconds()
    );
  }
}

export default Date;
