const express = require('express');
const path = require('path');

const app = express();

// Define the folder containing images
const imagePath = path.join(__dirname, 'images');

// Serve images statically
app.use('/images', express.static(imagePath));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
