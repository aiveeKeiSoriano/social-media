const Token = require("../models/tokens")
const User = require("../models/user")

const addNewToken = async ({ refresh_token, email }) => {
    let user = await User.findOne({ email })
    if (!user) {
        throw new Error("User not found")
    }
    const newToken = new Token({ refresh_token, user })
    await newToken.save()
    return newToken
}

const removeToken = async (email) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error("User not found")
    }
    const token = await Token.deleteOne({ user: user._id })
    return token
}

const checkToken = async (refresh_token) => {
    const token = await Token.findOne({ refresh_token })
    if (!token) {
        throw new Error("Refresh token not found")
    }
    return token
}

module.exports = {
    addNewToken,
    removeToken,
    checkToken
}