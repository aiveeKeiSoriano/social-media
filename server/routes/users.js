const express = require("express")
const asyncHandler = require("../asyncHandler")
const userController = require("../controllers/userController")

const router = express.Router()

router.get("/", asyncHandler(async (req, res) => {
    let result = await userController.getUsersList()
    res.status(200).send(result)
}))

router.post("/:username/follow", asyncHandler(async (req, res) => {
    await userController.followUser(req.username, req.params.username)
    res.status(200).send({message: "Followed successfully"})
}))

router.post("/:username/unfollow", asyncHandler(async (req, res) => {
    await userController.unfollowUser(req.username, req.params.username)
    res.status(200).send({message: "Unfollowed successfully"})
}))

router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.log(err)
    res.status(401).json({ message: err.message });
});

module.exports = router