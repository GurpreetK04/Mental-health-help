const express = require('express');
const app = express();
const port = 3000;

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
