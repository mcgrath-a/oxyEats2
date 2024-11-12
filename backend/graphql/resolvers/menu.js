const Menu = require('../../models/menu'); // Assuming your model file is named menu.js

const resolvers = {
    async getAllMenus() {
      try {
        return await Menu.find();
      } catch (error) {
        throw new Error('Error fetching menus: ' + error.message);
      }
    },
    async getMenuByDay({ day }) {
      try {
        return await Menu.findOne({ day });
      } catch (error) {
        throw new Error('Error fetching menu by day: ' + error.message);
      }
    },
    async getMenuByDate({ date }) {
      try {
        return await Menu.findOne({ date });
      } catch (error) {
        throw new Error('Error fetching menu by date: ' + error.message);
      }
    },
    async createMenu({ dayInput }) {
        
        try {
          const updatedDay = await Menu.findOneAndUpdate(
            { _id: dayInput._id },         
            { $set: { data: dayInput.data } }, 
            { new: true }                   
          );

          if (!updatedDay) {
            throw new Error('Day not found');
          }

          return updatedDay;
        } catch (error) {
        throw new Error('Error creating menu: ' + error.message);
        }
    },
    async updateMeal({ dayId, meal, mealInput }) {
        try {
        const menu = await Menu.findById(dayId);
        if (!menu) throw new Error('Menu not found');

        const mealIndex = menu.data.findIndex(m => m.meal === meal);
        if (mealIndex === -1) throw new Error('Meal not found');

        menu.data[mealIndex] = mealInput;

        await menu.save();
        return menu;
        } catch (error) {
        throw new Error('Error updating meal: ' + error.message);
        }
    }
};

module.exports = resolvers;
