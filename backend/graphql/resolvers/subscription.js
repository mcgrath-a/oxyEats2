const bcrypt = require('bcryptjs');
const User = require('../../models/user');

module.exports = {
  getAllSubscription: async () => {
    const users = await User.find({ role: "Student", isSubscribedToNewsletter: true });
    if (!users) {
     return []
    }
  
    return users;
  },

  getSubscription: async ({ userId }) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
  
    return user;
  },

  subscribeToNewsletter: async ({ userId }) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
  
    user.isSubscribedToNewsletter = true;
    await user.save();
  
    return user;
  },
  
  unsubscribeFromNewsletter: async ({ userId }) => {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
  
    user.isSubscribedToNewsletter = false;
    await user.save();
  
    return user;
  },
};
