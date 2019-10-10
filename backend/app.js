const express = require("express");
const path = require("path");
const config = require("dotenv").config();
const mongoose = require("mongoose");

var morgan = require("morgan");

const rateLimit = require("express-rate-limit");

// App
const app = express();

// Middleware
app.use(require("helmet")()); // Security module

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500 // limit each IP to N requests per windowMs
});

app.use(limiter);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(morgan("dev"));

// Routes
app.use("/api/auth", require("./modules/auth/auth.routes"));
app.use(
  "/api/transactions",
  require("./modules/transaction/transaction.routes")
);
app.use("/api/labels", require("./modules/label/label.routes"));
app.use("/api/accounts", require("./modules/account/account.routes"));

// public Upload endpoint
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage }).single("file");

app.post("/upload", function(req, res) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

// Catch all 404
app.use(function(req, res, next) {
  return res.status(404).send({
    message: "Route " + req.url + " Not found."
  });
});

// // Serve static files
// app.use(express.static(path.join(__dirname, "static")))
// app.use(express.static(path.join(__dirname, '/frontend/build')));

// // Route all other routes to frontend
// // '/' will be handled by front end
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
// });

// Mongodb
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log(`Connected to Database ${process.env.MONGODB}`);

  // Start The server
  PORT = process.env.PORT;
  const server = app.listen(PORT, () => {
    console.log(`Starting server on  ${PORT}`);
  });
});
