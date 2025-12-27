const express = require("express");
const router = express.Router();

const {
    getPaymentSummary,
    getPaymentHistory,
    getPaymentMethods,
    addPaymentMethod,
    makePayment
} = require("../Controller/paymentController");

router.get("/summary/:userId", getPaymentSummary);


router.get("/history/:userId", getPaymentHistory);


router.get("/methods/:userId", getPaymentMethods);


router.post("/add-method", addPaymentMethod);


router.post("/pay", makePayment);

module.exports = router;
