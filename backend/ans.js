const express = require('express');
const mongodb = require('mongodb');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'mental_health_help';

let db;

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the database');
    db = client.db(dbName);
  }
});

app.post('/api/comments', (req, res) => {
  const { name, comment } = req.body;

  const commentsCollection = db.collection('comments');
  commentsCollection.insertOne({ name, comment }, (err, result) => {
    if (err) {
      console.error('Failed to save the comment:', err);
      return res.status(500).json({ error: 'Failed to save the comment' });
    }

    const savedComment = result.ops[0];
    res.status(200).json(savedComment);
  });
});

app.get('/api/comments', (req, res) => {
  const commentsCollection = db.collection('comments');
  commentsCollection.find({}).toArray((err, comments) => {
    if (err) {
      console.error('Failed to retrieve comments:', err);
      return res.status(500).json({ error: 'Failed to retrieve comments' });
    }

    res.status(200).json(comments);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
