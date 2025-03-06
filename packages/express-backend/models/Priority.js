// Priority.js
class Priority {
  constructor(amount, label) {
    this.amount = amount; // Double (Number in JS)
    this.label = label; // Must be HIGH, MEDIUM, LOW
  }

  setPriority(amount) {
    this.amount = amount;
  }

  setLabel(label) {
    if (["HIGH", "MEDIUM", "LOW"].includes(label)) {
      this.label = label;
    } else {
      throw new Error("Label must be HIGH, MEDIUM, or LOW");
    }
  }

  // Utility to convert to schema-compatible object
  toSchema() {
    return { amount: this.amount, label: this.label };
  }
}

export default Priority;
