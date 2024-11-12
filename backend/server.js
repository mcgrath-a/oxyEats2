const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const dotenv = require("dotenv");

const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const {scrapeMenuData, customMenu} = require("./graphql/resolvers/fetchData")

dotenv.config();
const app = express();
const PORT = 5003;
app.use(cors({
  origin: "*",
  credentials: true
}))
app.use(bodyParser.json());

app.get('/scrape', async (req, res) => {
  try {
    res.json(await scrapeMenuData(req)); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while scraping the website');
  }

});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: process.env.DEBUG == "true" ? true : false
  })
);

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`); });

mongoose
  .connect( process.env.DEBUG == "true" ? process.env.MONGO_URI_LOCAL : process.env.MONGO_URI_PROD)
  .then(() => {
    app.listen(3001);
    console.log("DB CONNECTED")
  })
  .catch(err => {
    console.log(err);
  });