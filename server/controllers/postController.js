const mongoose = require("mongoose")

const Post = require("../models/post")
const User = require("../models/user")

const createNewPost = async (content, username) => {
    let user = await User.findOne({ username })
    if (!user) {
        throw new Error("User not found")
    }
    let newPost = new Post({ content, author: user })
    await newPost.save()
    return newPost
}

const deletePost = async (inputId, username) => {
    let id = mongoose.mongo.ObjectID(inputId)
    let user = await User.findOne({ username })
    if (!user) {
        throw new Error("User not found")
    }
    let post = await Post.findOne({ _id: id }).populate("author")
    if (!post) {
        throw new Error("Post not found")
    }
    if (username != post.author.username) {
        throw new Error("Cannot delete someone else's post")
    }
    let deleted = await Post.deleteOne({ _id: id })
    return deleted
}

const likePost = async (inputId, username) => {
    let id = mongoose.mongo.ObjectID(inputId)
    let user = await User.findOne({ username })
    if (!user) {
        throw new Error("User not found")
    }
    let post = await Post.findOne({ _id: id })
    if (!post) {
        throw new Error("Post not found")
    }
    if (post.likes.includes(user._id)) {
        throw new Error("You can't like a post twice")
    }
    post.likes.push(user)
    await post.save()
    return "Liked!"
}

const unlikePost = async (inputId, username) => {
    let id = mongoose.mongo.ObjectID(inputId)
    let user = await User.findOne({ username })
    if (!user) {
        throw new Error("User not found")
    }
    let post = await Post.findOne({ _id: id })
    if (!post) {
        throw new Error("Post not found")
    }
    if (!post.likes.includes(user._id)) {
        throw new Error("You can't unlike what you didn't like")
    }
    let updatedPost = await Post.updateOne({ _id: id }, { $pull: { likes: user._id } })
    return updatedPost
}

const getPosts = async (username) => {
    let user = await User.findOne({ username })
    if (!user) {
        throw new Error("User not found")
    }
    let posts = await Post.find({ author: [...user.following, user._id] }).sort("-createdAt").populate("author").populate("likes")
    let removeUnnecessaryInfo = posts.slice(0,20).map(el => ({ ...el._doc, likes: el._doc.likes.map(el2 => el2._doc.username), author: { username: el._doc.author.username, picture: el._doc.author.picture } }) )
    return removeUnnecessaryInfo
}

const getUserPosts = async (username) => {
    let user = await User.findOne({ username })
    if (!user) {
        throw new Error("User not found")
    }
    let list = await Post.find({ author: user._id }).sort("-createdAt").populate("author").populate("likes")
    let removeUnnecessaryInfo = list.map(el => ({ ...el._doc, likes: el._doc.likes.map(el2 => el2._doc.username), author: { username: el._doc.author.username, picture: el._doc.author.picture } }) )
    return removeUnnecessaryInfo
}

module.exports = {
    createNewPost,
    deletePost,
    likePost,
    unlikePost,
    getPosts,
    getUserPosts
}