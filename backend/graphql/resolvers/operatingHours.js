const OperatingHours = require("../../models/operatinghours");

module.exports = {
  // Fetch all operating hours
  getOperatingHours: async () => {
    try {
      console.log("Fetching all operating hours...");
      const hours = await OperatingHours.find(); // Fetch all documents
      console.log("Fetched operating hours:", hours);
      return hours;
    } catch (error) {
      console.error("Error fetching operating hours:", error.message);
      throw new Error("Failed to fetch operating hours: " + error.message);
    }
  },

  // Update or create operating hours for a specific day
  updateOperatingHours: async ({ operatingHours }) => {
    try {
      console.log(
        "Received input for updating operating hours:",
        operatingHours
      );
      const { day, startTime, endTime } = operatingHours;

      console.log("Updating operating hours for day:", day);
      console.log("New start time:", startTime, "New end time:", endTime);

      const updatedHours = await OperatingHours.findOneAndUpdate(
        { day }, // Find by day
        { startTime, endTime }, // Update times
        { new: true, upsert: true } // Create if not found
      );

      console.log("Updated or created document:", updatedHours);
      return updatedHours;
    } catch (error) {
      console.error("Error updating operating hours:", error.message);
      throw new Error("Failed to update operating hours: " + error.message);
    }
  },
};
