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

const getUser = async (username) => {
    let user = await User.findOne({ username }).populate("following").populate("followers")
    if (!user) {
        throw new Error("User not found")
    }
    let followers = user.followers.map(el => ({ username: el._doc.username, picture: el._doc.picture }))
    let following = user.following.map(el => ({ username: el._doc.username, picture: el._doc.picture }))
    let temp = { ...user._doc, following, followers }
    delete temp.password
    return temp
}

const followUser = async (meUsername, username) => {
    let meUser = await User.findOne({ username: meUsername })
    if (!meUser) {
        throw new Error("Request user not found")
    }
    let targetUser = await User.findOne({ username })
    if (!targetUser) {
        throw new Error("Target user not found")
    }
    if (meUser.username === username) {
        throw new Error("Cannot follow self")
    }
    if (meUser.following.includes(targetUser._id)) {
        throw new Error("You are already following this user")
    }
    meUser.following.push(targetUser)
    await meUser.save()
    targetUser.followers.push(meUser)
    await targetUser.save()
    return "Followed"
}

const unfollowUser = async (meUsername, username) => {
    let meUser = await User.findOne({ username: meUsername })
    if (!meUser) {
        throw new Error("Request user not found")
    }
    let targetUser = await User.findOne({ username })
    if (!targetUser) {
        throw new Error("Target user not found")
    }
    if (meUser.username === username) {
        throw new Error("Cannot unfollow self")
    }
    if (!meUser.following.includes(targetUser._id)) {
        throw new Error("You are not following this user")
    }
    await User.updateOne({ username: meUsername }, { $pull: { following: targetUser } } )
    await User.updateOne({ username }, { $pull: { followers: meUser } })
    return "Unfollowed"
}

const getUsersList = async () => {
    let list = await User.find()
    let removedSensitiveInfo = list.map(el => ({ username: el._doc.username, picture: el._doc.picture, followersTotal: el._doc.followers.length }))
    return removedSensitiveInfo
}

module.exports = {
    createNewUser,
    checkUser,
    getUser,
    followUser,
    unfollowUser,
    getUsersList
}