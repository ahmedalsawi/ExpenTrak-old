const express = require('express');
const path = require('path');
const config = require('dotenv').config()
const mongoose = require('mongoose');

var morgan = require('morgan')

// App
const app = express();

// Middleware
app.use(require('helmet')()); // Security module
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use(morgan('dev'))

// Api routes
app.use('/api/auth', require('./api/auth.js'))

// Serve static files
app.use(express.static(path.join(__dirname, "static")))
app.use(express.static(path.join(__dirname, '/frontend/build')));

// Route all other routes to frontend
// '/' will be handled by front end
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

// Mongodb
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`Connected to Database ${process.env.MONGODB}`)

  // Start The server
  PORT = process.env.PORT
  const server = app.listen(PORT, () => {
    console.log(`Starting server on  ${PORT}`);
  })
});