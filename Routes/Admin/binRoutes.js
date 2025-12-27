
const express = require("express");
const {
    createBin,
    getAllBins,
    getBinById,
    updateBin,
    deleteBin
} = require("../Controller/binController");

const router = express.Router();

// CREATE BIN
router.post("/create", createBin);

// GET ALL BINS
router.get("/", getAllBins);

// GET SINGLE BIN
router.get("/:id", getBinById);

// UPDATE BIN
router.put("/:id", updateBin);

// DELETE BIN
router.delete("/:id", deleteBin);

module.exports = router;
