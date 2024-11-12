const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,  
    trim: true,      
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the User model
    ref: 'User',                  // Specify the model name to reference
    required: true                // Ensure a user ID is always provided
  }
});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);

module.exports = FeedbackModel;
