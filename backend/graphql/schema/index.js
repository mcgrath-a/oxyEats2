const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Ratings {
  _id: ID!
  name: String!
  rating: Int!
}

type Banner {
  _id: ID!
  startTimeOne: String!
  startTimeTwo: String!
  endTimeOne: String!
  endTimeTwo: String!
  startTimeText: String!  
  endTimeText: String!    
}

type MenuItem {
  _id: ID!
  name: String!
  description: String
}

type User {
  _id: ID!
  email: String!
  newsEmail: String
  fullName: String!
  password: String
  role: String!
  isSubscribedToNewsletter: Boolean!
  favorites: [MenuItem!]!
  ratings: [Ratings!]!  # Field for rating
}

input UserInput {
  email: String!
  password: String!
  fullName: String!
  role: String
}

input UserUpdateInput {
  userId: ID!  
  newsEmail: String!
  fullName: String!
}

input UserCredentials {
  email: String!
  password: String!
}

input MenuItemInput {
  name: String!
  description: String
}

input RateMenuItemInput {
  userId: ID!  
  menuItemName: String!  
  rating: Int!  
}

input BannerTimeInput {
  bannerId: ID!  
  startTimeOne: String!
  startTimeTwo: String!
  endTimeOne: String!
  endTimeTwo: String!
  startTimeText: String! 
  endTimeText: String!   
}

type Meal {
  meal: String!
  foods: [String!]!
}

type Day {
  _id: ID!
  day: String!
  date: String!
  data: [Meal!]!
}

input MealInput {
  meal: String!
  foods: [String!]!
}

input DayInput {
  _id: ID!
  day: String!
  date: String!
  data: [MealInput!]!
}

type Text {
  _id: ID!
  content: String!
  createdAt: String!
  userId: User!
}

input TextInput {
  content: String!
  userId: String!
}

type RootQuery {

  getAllMenus: [Day!]!
  getMenuByDay(day: String!): Day
  getMenuByDate(date: String!): Day

  getAllUsers: [User!]!
  getMe(userId: ID!): User! 

  userFavorites(userId: ID!): [MenuItem!]! 

  userRatings(userId: ID!): [Ratings!]! 

  getSubscription(userId: ID!): User! 

  getBannerTiming(bannerId: ID!): Banner! 

  getAllTexts: [Text!]!
  getTextById(id: ID!): Text

}

type RootMutation {

  createUser(userInput: UserInput): User
  loginUser(userInput: UserCredentials): User
  updateMe(userInput: UserUpdateInput): User

  addFavorite(userId: ID!, menuItemInput: MenuItemInput): User 
  removeFavorite(userId: ID!, menuItemName: String!): User 
  
  rateFavoriteMenuItem(rateMenuItemInput: RateMenuItemInput): User 
  
  subscribeToNewsletter(userId: ID!): User
  unsubscribeFromNewsletter(userId: ID!): User

  updateBannerTime(banner: BannerTimeInput): Banner

  createMenu(dayInput: DayInput): Day
  updateMeal(dayId: ID!, meal: String!, mealInput: MealInput): Day

  createText(textInput: TextInput): Text
  
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
