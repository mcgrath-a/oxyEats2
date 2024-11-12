const bcrypt = require('bcryptjs');
const User = require('../../models/user');

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        newsEmail: args.userInput.email,
        password: hashedPassword,
        fullName: args.userInput.fullName
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  loginUser: async args => {
    try {

      const existingUser = await User.findOne({ email: args.userInput.email });
      
      if (!existingUser) {
        throw new Error('User does not exist.');
      }
  
      const isPasswordCorrect = await bcrypt.compare(args.userInput.password, existingUser.password);
      
      if (!isPasswordCorrect) {
        throw new Error('Incorrect password.');
      }
  
      return { ...existingUser._doc, password: null, _id: existingUser.id, role: existingUser.role, fullName: existingUser.fullName };
  
    } catch (err) {
      throw err;
    }
  },

  getAllUsers: async args => {
    try {

      const existingUser = await User.find({ role: "Student" });
      return existingUser;
  
    } catch (err) {
      throw err;
    }
  },
  getMe: async args => {
    try {

      const user = await User.findById(args.userId);

      if (!user) {
        throw new Error('User not found');
      }

      return user;
  
    } catch (err) {
      throw err;
    }
  },
  updateMe: async ({ userInput }) => {
    try {

      const { userId, newsEmail, fullName } = userInput;
      const user = await User.findOneAndUpdate(
        { _id: userId }, 
        { $set: { newsEmail, fullName} },    
        { new: true, runValidators: true } 
      );
      
      if (!user) {
        throw new Error('User not found');
      }
      
      return user;
  
    } catch (err) {
      throw err;
    }
  }
};
