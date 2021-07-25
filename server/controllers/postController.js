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
    let post = await Post.findOne({ _id: id })
    if (!post) {
        throw new Error("Post not found")
    }
    if (user._id !== post.author) {
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
    let updatedPost = await Post.updateOne({ _id: id }, { $pull: { like: user._id } })
    return updatedPost
}

const getPosts = async (username) => {
    let user = await User.findOne({ username })
    if (!user) {
        throw new Error("User not found")
    }
    let posts = await Post.find({ author: [...user.following, user._id] }).sort("-createdAt").populate("author")
    let removedAuthorInfo = posts.map(el => ({ ...el._doc, author: { username: el._doc.author.username, picture: el._doc.author.picture } }) )
    return removedAuthorInfo 
}

module.exports = {
    createNewPost,
    deletePost,
    likePost,
    unlikePost,
    getPosts
}