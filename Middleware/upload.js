// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/complaints");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;


const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "..", "uploads", "complaints");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

module.exports = upload;
