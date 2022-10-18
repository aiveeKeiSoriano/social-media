const mongoose = require("mongoose")

const PingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const PingModel = new mongoose.model("Ping", PingSchema)

module.exports = PingModel