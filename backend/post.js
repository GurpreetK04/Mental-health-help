const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle form submission
app.post('/post-question', (req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  const problemTitle = req.body.problemTitle;
  const question = req.body.question;

  // Process the form data here (e.g., save to database)

  // Send a response
  res.send('Question posted successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
