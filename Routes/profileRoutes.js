
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getProfile, updateProfile } = require("../Controller/profileController");

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/profiles/"),
  filename: (req, file, cb) =>
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
    )
});
const upload = multer({ storage });

router.get("/:userId", getProfile);
router.put("/:userId", upload.single("profileImage"), updateProfile);

module.exports = router;
