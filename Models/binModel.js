const mongoose = require("mongoose")

const binSchema = new mongoose.Schema(
    {

        location:"String",
        type:"String",
        status:"String"




    }
)

module.exports = mongoose.model("Bin",binSchema)