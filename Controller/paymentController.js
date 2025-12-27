const Payment = require("../Models/paymentModel");
const PaymentMethod = require("../Models/paymentMethodModel");


// GET PAYMENT SUMMARY

exports.getPaymentSummary = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId || userId === "null") {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing userId"
            });
        }

        const paid = await Payment.find({ userId, status: "paid" });
        const pending = await Payment.find({ userId, status: "pending" });

        const totalPaid = paid.reduce((sum, p) => sum + p.amount, 0);
        const totalPending = pending.reduce((sum, p) => sum + p.amount, 0);

        res.status(200).json({
            success: true,
            balance: totalPaid,
            pendingAmount: totalPending,
        });

    } catch (err) {
        console.error("Error in getPaymentSummary:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// GET PAYMENT HISTORY

exports.getPaymentHistory = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId || userId === "null") {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing userId"
            });
        }

        const history = await Payment.find({ userId }).sort({ date: -1 });

        res.status(200).json({ success: true, history });

    } catch (err) {
        console.error("Error in getPaymentHistory:", err);
        res.status(500).json({ success: false, message: "Error loading history" });
    }
};


// GET PAYMENT METHODS

exports.getPaymentMethods = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId || userId === "null") {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing userId"
            });
        }

        const methods = await PaymentMethod.find({ userId });
        res.status(200).json({ success: true, methods });

    } catch (err) {
        console.error("Error in getPaymentMethods:", err);
        res.status(500).json({ success: false, message: "Error loading methods" });
    }
};


// ADD PAYMENT METHOD

exports.addPaymentMethod = async (req, res) => {
    try {
        const method = new PaymentMethod(req.body);
        await method.save();

        res.status(201).json({
            success: true,
            message: "Payment method added successfully"
        });

    } catch (err) {
        console.error("Error in addPaymentMethod:", err);
        res.status(500).json({ success: false, message: "Failed to add method" });
    }
};


// MAKE PAYMENT (COD or Online)

exports.makePayment = async (req, res) => {
    try {
        const newPayment = new Payment(req.body);
        await newPayment.save();

        res.status(201).json({
            success: true,
            message: "Payment saved successfully"
        });

    } catch (err) {
        console.error("Error in makePayment:", err);
        res.status(500).json({ success: false, message: "Payment failed" });
    }
};
