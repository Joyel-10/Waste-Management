const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["paid", "pending"],
        default: "pending",
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Payment", paymentSchema);
