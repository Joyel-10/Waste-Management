// const express = require("express");
// const router = express.Router();

// const {
//   schedulePickup,
//   getPickupHistory,
//   cancelPickup,
//   reschedulePickup,
//   getPaymentHistory,
//   getAllPickups,

//   getPickupById,
//   updatePickupById,
//   deletePickupById,
// } = require("../Controller/pickupController");

// router.post("/schedule", schedulePickup);
// router.patch("/reschedule", reschedulePickup);
// router.delete("/cancel/:id", cancelPickup);
// router.get("/history/:userId", getPickupHistory);

// router.get("/payment-history/:userId", getPaymentHistory);
// router.get("/all", getAllPickups);
// // 
// router.get("/:id", getPickupById);
// router.put("/:id", updatePickupById);
// router.delete("/:id", deletePickupById);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  schedulePickup,
  getPickupHistory,
  cancelPickup,
  reschedulePickup,
  getPaymentHistory,
  getAllPickups,
  getPickupById,
  updatePickupById,
  deletePickupById,
} = require("../Controller/pickupController");


router.post("/schedule", schedulePickup);
router.patch("/reschedule", reschedulePickup);
router.delete("/cancel/:id", cancelPickup);  
router.get("/history/:userId", getPickupHistory);
router.get("/payment-history/:userId", getPaymentHistory);
router.get("/all", getAllPickups);


router.get("/:id", getPickupById);
router.put("/:id", updatePickupById);
router.delete("/:id", deletePickupById);  

module.exports = router;