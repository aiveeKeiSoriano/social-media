const express = require("express")
const asyncHandler = require("../asyncHandler")
const postController = require("../controllers/postController")

const router = express.Router()


router.get("/", asyncHandler(async (req, res) => {
    let result = await postController.getPosts(req.username)
    res.status(200).json(result)
}))

router.post("/", asyncHandler(async (req, res) => {
    let result = await postController.createNewPost(req.body.content, req.username)
    res.status(201).json(result)
}))

router.post("/:id/like", asyncHandler(async (req, res) => {
    await postController.likePost(req.params.id, req.username)
    res.status(200).json({message: "Liked successfully"})
}))

router.post("/:id/unlike", asyncHandler(async (req, res) => {
    await postController.unlikePost(req.params.id, req.username)
    res.status(200).json({message: "Unliked successfully"})
}))

router.delete("/:id", asyncHandler(async (req, res) => {
    let result = await postController.deletePost(req.params.id, req.username)
    res.status(201).json({message: "Deleted successfully"})
}))

router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.log(err)
    res.status(401).json({ message: err.message });
})

module.exports = router