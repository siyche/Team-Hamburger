// CourseNo.js
class CourseNo {
  constructor(dept, no) {
    if (!["CSC", "CPE", "EE"].includes(dept)) {
      throw new Error("Department must be CSC, CPE, or EE");
    }
    if (no <= 0 || no >= 1000) {
      throw new Error("Number must be between 1 and 999");
    }
    this.dept = dept;
    this.no = no;
  }

  toSchema() {
    return { dept: this.dept, no: this.no };
  }
}

export default CourseNo;
