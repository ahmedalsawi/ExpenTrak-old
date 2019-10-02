const express = require('express');
const path = require('path');
const config = require('dotenv').config()

// App
const app = express();

// Middleware
app.use(require('helmet')()); // Security module
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use(require('./middleware/logger')({
  env: process.env.ENV
}))
// Api routes
app.use('/api/auth', require('./api/auth.js'))

// Serve static files
app.use(express.static(path.join(__dirname, "static")))
app.use(express.static(path.join(__dirname, '/../frontend/build')));

// Route all other routes to frontend
// '/' will be handled by front end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Starting server on  ${PORT}`);
})