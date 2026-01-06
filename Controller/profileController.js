

// const User = require("../Models/userModel");

// // GET PROFILE
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).select("-password");
//     if (!user)
//       return res.status(404).json({ message: "User not found" });

//     res.json({ user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // UPDATE PROFILE
// exports.updateProfile = async (req, res) => {
//   try {
//     const { name, email, phone } = req.body;

//     const updated = { name, email, phone };

//     if (req.file) {
//       updated.profileImage = req.file.filename;
//     }

//     const user = await User.findByIdAndUpdate(
//       req.params.userId,
//       updated,
//       { new: true }
//     ).select("-password");

//     if (!user)
//       return res.status(404).json({ message: "User not found" });

//     res.json({ user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// profileController.js
const User = require("../Models/userModel");
const fs = require("fs");
const path = require("path");

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }

    const updated = { name, email, phone: phone || "" };

    // Find existing user to get old image
    const existingUser = await User.findById(req.params.userId);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle new profile image
    if (req.file) {
      updated.profileImage = req.file.filename;

      // Delete old image if exists
      if (existingUser.profileImage) {
        const oldImagePath = path.join(
          __dirname,
          "../uploads/profiles",
          existingUser.profileImage
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      updated,
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ user, message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update profile error:", err);

    // Delete uploaded file if error occurs
    if (req.file) {
      const filePath = path.join(__dirname, "../uploads/profiles", req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(500).json({ message: err.message || "Profile update failed" });
  }
};