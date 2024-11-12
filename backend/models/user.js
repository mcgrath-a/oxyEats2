const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
});

const ratingSchema = new Schema({
  name: { type: String, required: true },
  rating: {
    type: Number,
    default: 0  
  }
});

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  newsEmail: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    default: "Student"
  },
  fullName: {
    type: String,
    required: true
  },
  isSubscribedToNewsletter: {
    type: Boolean,
    default: false,
  },
  favorites: [menuItemSchema],
  ratings: [ratingSchema]
});

module.exports = mongoose.model('User', userSchema);
