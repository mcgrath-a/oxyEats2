const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bannerSchema = new Schema({
  startTimeOne: {
    type: String,
    required: true
  },
  startTimeTwo: {
    type: String,
    required: true
  },
  endTimeOne: {
    type: String,
    required: true
  },
  endTimeTwo: {
    type: String,
    required: true
  },
  startTimeText: {
    type: String,
    required: true
  },
  endTimeText: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('BannerTime', bannerSchema);
