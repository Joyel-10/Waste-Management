

const Pickup = require("../Models/Pickup");


// Schedule a Pickup

const schedulePickup = async (req, res) => {
  try {
    const {
      userId,
      date,
      time,
      wasteType,
      price,
      paymentMethod,
      paymentDetails,
    } = req.body;

    if (!userId || !date || !time || !wasteType || !price || !paymentMethod) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Determine payment status
    const paymentStatus = paymentMethod === "Cash on Pickup" ? "Pending" : "Success";

    const newPickup = await Pickup.create({
      userId,
      date,
      time,
      wasteType,
      price,
      paymentMethod,
      paymentDetails,
      paymentStatus,
      status: "Scheduled",
    });

    return res.status(200).json({
      message: "Pickup scheduled successfully",
      pickup: newPickup,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};


// Get ALL Pickup History

const getPickupHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const pickups = await Pickup.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, pickups });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};


// Get Payment History (NEW API)

const getPaymentHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const payments = await Pickup.find({
      userId,
      paymentMethod: { $exists: true },
    })
      .select("date time price paymentMethod paymentStatus createdAt wasteType")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, payments });

  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};


// Get latest scheduled pickup

const getLatestScheduledPickup = async (req, res) => {
  try {
    const { userId } = req.params;

    const pickup = await Pickup.findOne({
      userId,
      status: "Scheduled",
    }).sort({ createdAt: -1 });

    if (!pickup) {
      return res.status(404).json({
        message: "No scheduled pickup available",
        pickup: null,
      });
    }

    return res.status(200).json({
      message: "Scheduled pickup found",
      pickup,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};


// Cancel Pickup

const cancelPickup = async (req, res) => {
  try {
    const { id } = req.params;

    const pickup = await Pickup.findOneAndUpdate(
      { _id: id, status: "Scheduled" },
      { status: "Cancelled" },
      { new: true }
    );

    if (!pickup) {
      return res.status(404).json({ message: "No scheduled pickup found" });
    }

    return res.status(200).json({ message: "Pickup cancelled", pickup });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// --------ADMIN — Get All Pickup Requests
const getAllPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find()
      .populate("userId", "username email name") // fetch user details
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      pickups,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

// GET single pickup by id
const getPickupById = async (req, res) => {
  try {
    const id = req.params.id;
    const pickup = await Pickup.findById(id).populate("userId", "name email username");
    if (!pickup) return res.status(404).json({ success: false, message: "Pickup not found" });
    return res.status(200).json({ success: true, pickup });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


const updatePickupById = async (req, res) => {
  try {
    const id = req.params.id;
    const allowed = ["status", "date", "time", "wasteType", "price", "paymentMethod", "paymentDetails"];
    const update = {};
    for (const k of allowed) if (req.body[k] !== undefined) update[k] = req.body[k];

    const updated = await Pickup.findByIdAndUpdate(id, update, { new: true }).populate("userId", "name email username");
    if (!updated) return res.status(404).json({ success: false, message: "Pickup not found" });
    return res.status(200).json({ success: true, message: "Pickup updated", pickup: updated });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// DELETE pickup by id
const deletePickupById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Pickup.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Pickup not found" });
    return res.status(200).json({ success: true, message: "Pickup deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};


// Reschedule Pickup

const reschedulePickup = async (req, res) => {
  try {
    const {
      userId,
      date,
      time,
      wasteType,
      price,
      paymentMethod,
      paymentDetails,
    } = req.body;

    if (!userId || !date || !time || !wasteType || !price || !paymentMethod) {
      return res.status(400).json({ message: "All fields required" });
    }

    const paymentStatus =
      paymentMethod === "Cash on Pickup" ? "Pending" : "Success";

    const updatedPickup = await Pickup.findOneAndUpdate(
      { userId, status: "Scheduled" },
      {
        date,
        time,
        wasteType,
        price,
        paymentMethod,
        paymentDetails,
        paymentStatus,
      },
      { new: true }
    );

    if (!updatedPickup) {
      return res
        .status(404)
        .json({ message: "No scheduled pickup to reschedule" });
    }

    return res.status(200).json({
      message: "Pickup rescheduled successfully",
      pickup: updatedPickup,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// EXPORT ALL
module.exports = {
  schedulePickup,
  getPickupHistory,
  getPaymentHistory,
  getLatestScheduledPickup,
  cancelPickup,
  reschedulePickup,
  getAllPickups,
  getPickupById,
  updatePickupById,
  deletePickupById,
};
