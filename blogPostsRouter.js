const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const { BlogPosts } = require("./models");

//sample starter data
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

//GET requests enpoint
router.get("/", (req, res) => {
  res.json(BlogPosts.get());
});

//POST request endpoint
router.post("/", jsonParser, (req, res) => {
  const requiredFields = ["title", "content", "author"];
  for (var i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = BlogPosts.create(
    req.body.title,
    req.body.content,
    req.body.author
  );
  res.status(201).json(item);
});

//DELETE request endpoint
router.delete("/:id", (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.id}\``);
  res.status(204).end();
});

//PUT request endpoint
router.put("/:id", jsonParser, (req, res) => {
  const requiredFields = ["id", "title", "content", "author", "publishDate"];
  for (var i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = `Request path id (${
      req.params.id
    }) and request body id ``(${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating blog post \`${req.params.id}\``);
  const updatedItem = BlogPosts.update({
    id: req.params.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });
  res.status(204).end();
});

module.exports = router;
