const bcrypt = require("bcrypt")

const User = require("../models/user")

const createNewUser = async (data) => {
    const { username, email, password, picture } = data
    if (!username) {
        throw new Error("Username required")
    }
    if (!email) {
        throw new Error("Email required")
    }
    const emailRegex = /\S+@\S+[.]\S+/
    if (!emailRegex.test(email)) {
        throw new Error("Bad email format")
    }
    if (!password) {
        throw new Error("Password required")
    }
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters")
    }

    let hash = await bcrypt.hash(password, 10)
    data.password = hash
    const newUser = new User(data)
    await newUser.save()
    return newUser
}

const checkUser = async ({ username, password }) => {
    let user = await User.findOne({ username })
    if (!username || !password) {
        throw new Error("Insufficient requirements")
    }
    if (!user) {
        throw new Error("User not found")
    }
    if (await bcrypt.compare(password, user.password)) {
        return user
    }
    else {
        throw new Error("Wrong password")
    }
}

const getUser = async (email) => {
    let user = await User.findOne({ email })
    if (!user) {
        throw new Error("User not found")
    }
    return user
}

module.exports = {
    createNewUser,
    checkUser,
    getUser
}