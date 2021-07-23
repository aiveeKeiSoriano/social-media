const mongoose = require("mongoose")

const TokenSchema = new mongoose.Schema({
    refresh_token: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

const TokenModel = new mongoose.model("Token", TokenSchema)

module.exports = TokenModel