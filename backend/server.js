const dotenv = require("dotenv");
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const { scrapeMenuData } = require("./graphql/resolvers/fetchData");

dotenv.config({ path: "./.env" });
const app = express();
const PORT = 5003;

// Middleware
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());

// Scraping endpoint
app.get("/scrape", async (req, res) => {
  try {
    res.json(await scrapeMenuData(req));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping the website");
  }
});

// GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: process.env.DEBUG === "true", // Enable GraphiQL in debug mode
  })
);
mongoUri =
  "mongodb+srv://mcgratha:sC37EWQCl41rlnWG@oxyeats.6kfxnok.mongodb.net/test?retryWrites=true&w=majority";

if (
  !mongoUri ||
  (!mongoUri.startsWith("mongodb://") && !mongoUri.startsWith("mongodb+srv://"))
) {
  console.log("Using MongoDB URI:", mongoUri);
  console.error("MongoDB URI is invalid.");
  process.exit(1); // Exit the application if the URI is invalid
}

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connection successful");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the application if the connection fails
  });
