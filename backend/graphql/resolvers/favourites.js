const User = require('../../models/user'); // Assuming a User model with MongoDB
const mongoose = require('mongoose');
const getCleanText  = require("../../utilities")
module.exports = {
  userFavorites: async (args) => {
    try {
      const user = await User.findById(args.userId);

      if (!user) {
        throw new Error('User not found');
      }

      // Return the list of favorite menu items
      return user.favorites;  // This returns the favorites array
    } catch (err) {
      throw err;
    }
  },
  addFavorite: async ({ userId, menuItemInput }) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      const cleanedText = getCleanText(menuItemInput.name)

      const newFavorite = { _id: new mongoose.Types.ObjectId(), name: menuItemInput.name, description: menuItemInput.description };
      user.favorites.push(newFavorite); // Add the new favorite menu item to the user's favorites list

      const hasRating = user.ratings.some(rating => rating.name === cleanedText);
      if (!hasRating) {
        user.ratings.push({ name: cleanedText, rating: 0 });
      }
      await user.save();
      
      return user;
    } catch (err) {
      throw err;
    }
  },
  
  removeFavorite: async ({ userId, menuItemName }) => {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      user.favorites = user.favorites.filter(fav => fav.name !== menuItemName);
      await user.save();
      
      return user;
    } catch (err) {
      throw err;
    }
  },
};