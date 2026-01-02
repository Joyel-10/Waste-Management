
const Complaint = require("../Models/complaintModel");


// ADD COMPLAINT (USER)

// exports.addComplaint = async (req, res) => {
//   try {
//     console.log("REQ.BODY:", req.body);
//     console.log("REQ.FILE:", req.file);

//     const { userId, userName, email, subject, message } = req.body;

//     if (!userId || !userName || !email || !subject || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const complaint = new Complaint({
//       userId,
//       userName,
//       email,
//       subject,
//       message,
//       image: req.file ? req.file.path : null,
//     });

//     await complaint.save();

//     return res.status(201).json({
//       success: true,
//       message: "Complaint submitted successfully",
//       complaint,
//     });

//   } catch (err) {
//     console.error("Error in addComplaint:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while submitting complaint",
//       error: err.message,
//     });
//   }
// };

exports.addComplaint = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);

    const { userId, userName, email, subject, message } = req.body;

    if (!userId || !userName || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const complaint = new Complaint({
      userId,
      userName,
      email,
      subject,
      message,

    
      image: req.file
        ? `/uploads/complaints/${req.file.filename}`
        : null,
    });

    await complaint.save();

    return res.status(201).json({
      success: true,
      message: "Complaint submitted successfully",
      complaint,
    });

  } catch (err) {
    console.error("Error in addComplaint:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting complaint",
      error: err.message,
    });
  }
};

// GET USER COMPLAINTS

exports.getUserComplaints = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const complaints = await Complaint.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      complaints,
    });

  } catch (err) {
    console.error("Error in getUserComplaints:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching complaints",
      error: err.message,
    });
  }
};


// ADMIN — GET ALL COMPLAINTS

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      complaints,
    });

  } catch (err) {
    console.error("Error in getAllComplaints:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching complaints",
      error: err.message,
    });
  }
};


// ADMIN — GET COMPLAINT BY ID

exports.getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    return res.status(200).json({
      success: true,
      complaint,
    });

  } catch (err) {
    console.error("Error in getComplaintById:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};


// ADMIN — UPDATE COMPLAINT

exports.updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const allowed = ["status", "adminRemarks"];
    const update = {};

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) update[field] = req.body[field];
    });

    const updated = await Complaint.findByIdAndUpdate(id, update, { new: true });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Complaint updated successfully",
      complaint: updated,
    });

  } catch (err) {
    console.error("Error in updateComplaint:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// ADMIN — DELETE COMPLAINT

exports.deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Complaint.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });

  } catch (err) {
    console.error("Error in deleteComplaint:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};