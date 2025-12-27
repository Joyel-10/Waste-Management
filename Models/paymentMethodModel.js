const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: { type: String, default: "card" },
    cardNumber: String,
    expiry: String,
});

module.exports = mongoose.model("PaymentMethod", paymentMethodSchema);
