const Feedback = require('../../models/feedback');

const feedbackResolvers = {
  getAllTexts: async () => {
    try {
      return await Feedback.find();
    } catch (err) {
      throw new Error("Failed to fetch texts");
    }
  },

  getTextById: async ({ id }) => {
    try {
      return await Feedback.findById(id);
    } catch (err) {
      throw new Error("Text not found");
    }
  },

  createText: async ({ textInput }) => {
    try {
      const newText = new Feedback({
        content: textInput.content,
        userId: textInput.userId
      });
      const savedText = await newText.save();
      await savedText.populate('userId');
      return savedText;
    } catch (err) {
      throw new Error("Failed to create text");
    }
  }
};

module.exports = feedbackResolvers;
