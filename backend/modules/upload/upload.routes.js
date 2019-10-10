var multer = require("multer");

const express = require('express')
const router = express.Router()

const path = require("path")
var fs = require('fs');

router.use(require('../../middleware/jwtAuthMW.js'))


router.post("/", (req, res) => {
  const dir = path.join("upload_dir", req.user._id);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, dir);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
      }
    })
  }).single("file");

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

router.get("/:id/:file", async function (req, res) {
  const {
    id,
    file
  } = req.params;

  if (req.user._id !== id) {
    return res.sendStatus(401);
  }

  const filePath = path.join(__dirname, "../..", "upload_dir", id, file)

  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      return res.sendStatus(404);
    }

    return res.sendFile(filePath);
  })

});
module.exports = router