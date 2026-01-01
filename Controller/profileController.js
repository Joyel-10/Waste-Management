

// const User = require("../Models/userModel");

// // GET PROFILE
// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).select("-password");

//     if (!user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     res.status(200).json({ success: true, user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
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
//       return res.status(404).json({ success: false, message: "User not found" });

//     res.status(200).json({
//       success: true,
//       user,
//       message: "Profile updated successfully"
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


const User = require("../Models/userModel");

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const updated = { name, email, phone };

    if (req.file) {
      updated.profileImage = req.file.filename;
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      updated,
      { new: true }
    ).select("-password");

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
