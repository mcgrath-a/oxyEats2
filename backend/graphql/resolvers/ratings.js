const User = require("../../models/user"); // Assuming a User model with MongoDB
const mongoose = require("mongoose");

module.exports = {
  userRatings: async (args) => {
    try {
      const user = await User.findById(args.userId);

      if (!user) {
        throw new Error("User not found");
      }

      // Return the list of favorite menu items
      return user.ratings; // This returns the favorites array
    } catch (err) {
      throw err;
    }
  },
  rateFavoriteMenuItem: async ({ rateMenuItemInput }) => {
    const { userId, menuItemName, rating } = rateMenuItemInput;

    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Check if the user already has a rating for the menu item
      let ratingFound = false;

      if (!user.ratings) {
        user.ratings = []; // Initialize the ratings array if it's undefined
      }

      user.ratings = user.ratings.map((ratingObj) => {
        if (ratingObj.name === menuItemName) {
          // Update the existing rating
          ratingObj.rating = rating;
          ratingFound = true;
        }
        return ratingObj;
      });

      // If no rating was found for the menuItemName, add a new rating
      if (!ratingFound) {
        user.ratings.push({ name: menuItemName, rating: rating });
      }

      // Save the updated user document
      await user.save();

      return user;
    } catch (err) {
      throw err;
    }
  },
};
