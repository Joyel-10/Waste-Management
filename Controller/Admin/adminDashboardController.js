const User = require("../../Models/userModel");
const Complaint = require("../../Models/complaintModel");
const Payment = require("../../Models/paymentModel");

exports.getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeComplaints = await Complaint.countDocuments({ status: "Pending" });

    const paymentsToday = await Payment.aggregate([
      {
        $match: {
          status: "paid",
          createdAt: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);

    const resolvedIssues = await Complaint.countDocuments({ status: "Completed" });

    const recentActivities = await Complaint.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("createdAt userName subject status");

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        activeComplaints,
        paymentsToday: paymentsToday[0]?.total || 0,
        resolvedIssues,
      },
      recentActivities: recentActivities.map((c) => ({
        date: c.createdAt.toISOString().split("T")[0],
        user: c.userName,
        action: c.subject,
        status: c.status,
      })),
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load admin dashboard",
      error: error.message,
    });
  }
};
