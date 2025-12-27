
const mongoose = require("mongoose");

const pickupSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    wasteType: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },

    price: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "Card", "Cash on Pickup"],
      default: "Cash on Pickup",
    },

    paymentDetails: {
      upiId: { type: String, default: null },
      cardNumber: { type: String, default: null },
      expiry: { type: String, default: null },
      cvv: { type: String, default: null },
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Success"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pickup", pickupSchema);
