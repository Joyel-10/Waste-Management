

const express = require("express");
const router = express.Router();
const { registerController, loginController } = require("../Controllers/userController");
const auth = require("../Middleware/authMiddleware");

router.post("/register", registerController);
router.post("/login", loginController);

// Optional: Verify token route
router.get("/me", auth, (req, res) => {
    res.json({ success: true, user: req.user });
});

module.exports = router;
