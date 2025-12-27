


const express = require("express");
const router = express.Router();
const upload = require("../Middleware/upload"); // multer middleware

const {
  addComplaint,
  getUserComplaints,
  getAllComplaints,
  getComplaintById,
  updateComplaint,
  deleteComplaint
} = require("../Controller/complaintController");

// ==============================
// SPECIFIC ROUTES FIRST
// ==============================

// USER ROUTES
router.post("/add", upload.single("image"), addComplaint);
router.get("/user/:userId", getUserComplaints);

// ADMIN ROUTES
router.get("/all", getAllComplaints);
router.put("/update/:id", updateComplaint);
router.delete("/delete/:id", deleteComplaint);

// ==============================
// PARAMETERIZED ROUTE LAST (VERY IMPORTANT!)
// ==============================
router.get("/:id", getComplaintById);

module.exports = router;