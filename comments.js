// Create web server
// 1. Create express server
// 2. Create a route for GET /comments
// 3. Create a route for GET /comments/:id
// 4. Create a route for POST /comments
// 5. Create a route for PUT /comments/:id
// 6. Create a route for DELETE /comments/:id

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');

const app = express();
const port = process.env.PORT || 8080;

const comments = [];

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/comments', (req, res) => {
  res.status(200).json(comments);
});

app.get('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === req.params.id);
  if (comment) {
    res.status(200).json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

app.post('/comments', (req, res) => {
  const comment = {
    id: uuid(),
    ...req.body,
  };
  comments.push(comment);
  res.status(201).json(comment);
});

app.put('/comments/:id', (req, res) => {
  const comment = comments.find(comment => comment.id === req.params.id);
  if (comment) {
    comment.content = req.body.content;
    res.status(200).json(comment);
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

app.delete('/comments/:id', (req, res) => {
  const commentIndex = comments.findIndex(comment => comment.id === req.params.id);
  if (commentIndex > -1) {
    comments.splice(commentIndex, 1);
    res.status(200).json({ message: 'Comment deleted' });
  } else {
    res.status(404).json({ message: 'Comment not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
