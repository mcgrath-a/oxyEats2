const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  meal: { type: String, required: true },
  foods: [{ type: String, required: true }]
});

const daySchema = new mongoose.Schema({
  day: { type: String, required: true },
  date: { type: String, required: true }, 
  data: [mealSchema]
});

const Day = mongoose.model('Menus', daySchema);

module.exports = Day;
