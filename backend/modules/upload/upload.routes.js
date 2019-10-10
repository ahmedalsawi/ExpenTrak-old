var multer = require("multer");

const express = require('express')
const router = express.Router()

const path = require("path")
var fs = require('fs');

router.use(require('../../middleware/jwtAuthMW.js'))

const uploadPath = path.join(__dirname, "../..", "upload_dir")

router.post("/", (req, res) => {
  const dir = path.join(uploadPath, req.user._id);
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
    const resJson = {
      filename: `${req.file.filename}`,
      url: `/upload/${req.file.filename}`
    }
    return res.status(200).send(resJson);
  });
});

router.get("/:file", async function (req, res) {
  const {
    file
  } = req.params;

  const id = req.user._id;

  const filePath = path.join(uploadPath, id, file)

  fs.access(filePath, fs.F_OK, (err) => {
    if (err) {
      return res.sendStatus(404);
    }

    return res.sendFile(filePath);
  })

});

module.exports = router