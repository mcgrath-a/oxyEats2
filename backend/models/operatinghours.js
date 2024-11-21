const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const operatingHoursSchema = new mongoose.Schema({
  day: {
    type: String, // Example: "Monday"
    required: true,
    unique: true,
  },
  startTime: {
    type: String, // Example: "07:30"
    required: true,
  },
  endTime: {
    type: String, // Example: "19:30"
    required: true,
  },
});

module.exports = mongoose.model(
  "OperatingHours",
  operatingHoursSchema,
  "operatinghours"
);
