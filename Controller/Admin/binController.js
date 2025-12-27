const Bin = require("../Models/binModel");

// CREATE BIN
exports.createBin = async (req, res) => {
  try {
    const { name, location, capacity } = req.body;

    if (!name || !location || !capacity) {
      return res.status(400).json({
        success: false,
        message: "Name, location & capacity are required",
      });
    }

    const newBin = await Bin.create({
      name,
      location,
      capacity,
      filledLevel: 0,
      status: "Active",
    });

    res.status(201).json({
      success: true,
      message: "Bin created successfully",
      bin: newBin,
    });
  } catch (err) {
    console.error("Create Bin Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// GET ALL BINS
exports.getAllBins = async (req, res) => {
  try {
    const bins = await Bin.find();

    res.status(200).json({
      success: true,
      bins,
    });
  } catch (err) {
    console.error("Get Bins Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// GET BIN BY ID
exports.getBinById = async (req, res) => {
  try {
    const bin = await Bin.findById(req.params.id);

    if (!bin) {
      return res.status(404).json({
        success: false,
        message: "Bin not found",
      });
    }

    res.status(200).json({
      success: true,
      bin,
    });
  } catch (err) {
    console.error("Get Bin By ID Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// UPDATE BIN
exports.updateBin = async (req, res) => {
  try {
    const updatedBin = await Bin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBin) {
      return res.status(404).json({
        success: false,
        message: "Bin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bin updated successfully",
      bin: updatedBin,
    });
  } catch (err) {
    console.error("Update Bin Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

// DELETE BIN
exports.deleteBin = async (req, res) => {
  try {
    const deletedBin = await Bin.findByIdAndDelete(req.params.id);

    if (!deletedBin) {
      return res.status(404).json({
        success: false,
        message: "Bin not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Bin deleted successfully",
    });
  } catch (err) {
    console.error("Delete Bin Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
