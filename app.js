import express from "express";
const app = express();
const PORT = 3000;

import {
  getQuotes,
  getQuoteByID,
  addQuote,
  editQuote,
  deleteQuote,
} from "./quote.js";

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to the inspirational quotes API");
});

//listen for a get request
//the route will be /quotes
//when we recieve a request
//get all quotes
//respond with all quotes

app.get("/quotes", async function (req, res) {
  const quotes = await getQuotes();
  res.json(quotes);
});

//listen for a get request
//route will be /quotes/:id
//when we recieve a request we want
//get the id from the request
//use the id to find the right quote
//respond with the quotes:

app.get("/quotes/:id", async function (req, res) {
  const id = req.params.id;
  const quote = await getQuoteByID(id);
  res.json(quote);
});

//Create a new quote
//Listen for POST request
//path of /quotes
//when we recieve a request
//create a new quote object
//add the new quote
//respond with the new quote

app.post("/quotes", async function (req, res) {
  // const quoteText = req.body.quoteText;
  // const author= req.body.author;
  const { quoteText, author } = req.body;
  const newQuote = await addQuote(quoteText, author);
  res.status(201).json(newQuote);
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});
