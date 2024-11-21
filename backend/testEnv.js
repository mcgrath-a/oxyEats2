const dotenv = require("dotenv");
dotenv.config({ path: "backend/.env" });

// Remove quotes if they exist
const mongoUri = process.env.MONGO_URI;

console.log("MONGO_URI:", mongoUri);
