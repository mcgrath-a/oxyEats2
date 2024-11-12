const bcrypt = require('bcryptjs');
const BannerTime = require('../../models/banner');
const { dateToString } = require("../../helpers/date")

module.exports = {
  updateBannerTime: async (args) => {

    const banner = await BannerTime.findOneAndUpdate(
      { _id: args.banner.bannerId }, 
      { $set: { 
        startTimeOne: args.banner.startTimeOne, 
        startTimeTwo: args.banner.startTimeTwo, 
        endTimeOne: args.banner.endTimeOne, 
        endTimeTwo: args.banner.endTimeTwo,
        startTimeText: args.banner.startTimeText,
        endTimeText: args.banner.endTimeText,
      } 
      },    
      { new: true, runValidators: true } 
    );
    
    if (!banner) {
      throw new Error('banner not found');
    }
    
    return banner;

  },
  
  getBannerTiming: async (args) => {

    const banner = await BannerTime.findById(args.bannerId)
    
    if (!banner) {
      throw new Error('banner not found');
    }
    
    return banner;

  },
};
