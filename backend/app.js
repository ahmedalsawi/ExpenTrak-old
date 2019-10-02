const express = require('express');
const path = require('path')

const app = express();


// Serve static files
app.use(express.static(path.join(__dirname, "static")))
app.use(express.static(path.join(__dirname, '/../frontend/build')));

// Route all other routes to frontend
// '/' will be handled by front end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

PORT = 8000
const server = app.listen(PORT, () => {
  console.log(`Starting server on  ${PORT}`);
})