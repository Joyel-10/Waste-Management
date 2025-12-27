const User = require("../Models/userModel");
const Pickup = require("../Models/Pickup");
const Complaint = require("../Models/complaintModel");

const getDashboardData = async (req, res) => {
  try {
    const { userId } = req.params;

    // USER
    const user = await User.findById(userId).select("username email phone");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

   
    const nextPickup = await Pickup.findOne({
      userId,
      status: "Pending",
    })
      .sort({ date: 1 })
      .select("date time wasteType");

    // COMPLAINT COUNT
    const complaintsCount = await Complaint.countDocuments({
      userId: userId,
      status: "pending"
    });



   
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 1);

    const monthlyPickups = await Pickup.find({
      userId,
      status: { $ne: "Cancelled" },
      createdAt: { $gte: monthStart, $lt: monthEnd },
    }).select("wasteType createdAt");

    // WASTE BREAKDOWN
    const wasteBreakdownAggregation = await Pickup.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: "$wasteType",
          total: { $sum: 1 },
        },
      },
    ]);

    const wasteBreakdown = wasteBreakdownAggregation.map((item) => ({
      title: item._id,
      value: item.total,
      color:
        item._id === "Organic Waste"
          ? "#10b981"
          : item._id === "Plastic Waste"
            ? "#3b82f6"
            : "#f59e0b",
    }));

    res.json({
      success: true,
      user,
      nextPickup,
      complaintsCount,
      monthlyWasteData: monthlyPickups,
      wasteBreakdown,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
      error: error.message,
    });
  }
};

module.exports = { getDashboardData };
