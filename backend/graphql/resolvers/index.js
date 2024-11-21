const authResolver = require("./auth");
const favouriteResolver = require("./favourites");
const rateFavoriteMenuItem = require("./ratings");
const subscriptionResolver = require("./subscription");
const bannerResolver = require("./banner");
const menuResolver = require("./menu");
const feedbackResolver = require("./feedback");
const operatingHoursResolver = require("./operatingHours");
const rootResolver = {
  ...authResolver,
  ...favouriteResolver,
  ...rateFavoriteMenuItem,
  ...subscriptionResolver,
  ...bannerResolver,
  ...menuResolver,
  ...feedbackResolver,
  ...operatingHoursResolver,
};

module.exports = rootResolver;
