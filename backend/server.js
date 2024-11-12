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
const { scrapeMenuData, customMenu } = require("./graphql/resolvers/fetchData");

dotenv.config();
const app = express();
const PORT = 5003;
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(bodyParser.json());

app.get("/scrape", async (req, res) => {
  try {
    res.json(await scrapeMenuData(req));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping the website");
  }
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: process.env.DEBUG == "true" ? true : false,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Check the MongoDB URI based on the environment mode
if (process.env.DEBUG === "true") {
  if (
    !process.env.MONGO_URI_LOCAL.startsWith("mongodb://") &&
    !process.env.MONGO_URI_LOCAL.startsWith("mongodb+srv://")
  ) {
    console.error("Local MongoDB URI is invalid.");
  } else {
    console.log("Connecting to MongoDB at:", process.env.MONGO_URI_LOCAL);
  }
} else {
  if (
    !process.env.MONGO_URI_PROD.startsWith("mongodb://") &&
    !process.env.MONGO_URI_PROD.startsWith("mongodb+srv://")
  ) {
    console.error("Production MongoDB URI is invalid.");
  } else {
    console.log("Connecting to MongoDB at:", "Production URI Hidden");
  }
}

// MongoDB Connection
const uri =
  "mongodb+srv://mcgratha:sC37EWQCl41rlnWG@oxyeats.6kfxnok.mongodb.net/NewDB?retryWrites=true&w=majority&appName=OxyEats";
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connection successful");
    app.listen(3001, () =>
      console.log("Server running on http://localhost:3001")
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
