const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const { BlogPosts } = require("./models");

BlogPosts.create(
  "Today is a new day",
  "What a lovely day it is",
  "Molly Jean Bennett"
);

BlogPosts.create(
  "New Thought",
  "I have another thought about today, which is that it is not so lovely after all",
  "Molly Jean Bennett"
);

router.get("/", (req, res) => {
  res.json(BlogPosts.get());
});

module.exports = router;
