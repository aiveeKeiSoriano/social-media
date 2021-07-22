const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        default: "defaultavatar.jpg"
    },
    following: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User",
        default: []
    },
    
    followers: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "User",
        default: []
    }
})

const UserModel = new mongoose.model("User", UserSchema)

module.exports = UserModel