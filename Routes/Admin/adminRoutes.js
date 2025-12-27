

const express = require("express");
const router = express.Router();

// ===== MIDDLEWARE =====
const authMiddleware = require("../../Middleware/adminAuth");

// ===== ADMIN AUTH CONTROLLER =====
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
} = require("../../Controller/Admin/adminController");

// ===== USER MANAGEMENT CONTROLLER =====
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../../Controller/Admin/AllUserscCntroller");

// ===== ADMIN DASHBOARD CONTROLLER =====
const {
  getAdminDashboard,
} = require("../../Controller/Admin/adminDashboardController");

// ===============================
// ADMIN AUTH (PUBLIC)
// ===============================
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// ===============================
// ADMIN PROFILE (PROTECTED)
// ===============================
router.get("/profile", authMiddleware, getAdminProfile);
router.put("/profile", authMiddleware, updateAdminProfile);

// ===============================
// ADMIN DASHBOARD (PROTECTED)
// ===============================
router.get("/dashboard", authMiddleware, getAdminDashboard);

// ===============================
// ADMIN → USER MANAGEMENT (PROTECTED)
// ===============================
router.get("/get-all-users", authMiddleware, getAllUsers);
router.get("/get-user/:id", authMiddleware, getUserById);
router.put("/update-user/:id", authMiddleware, updateUser);
router.delete("/delete-user/:id", authMiddleware, deleteUser);

module.exports = router;
