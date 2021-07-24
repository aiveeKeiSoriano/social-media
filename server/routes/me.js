const express = require("express")
const asyncHandler = require("../asyncHandler")
const jwt = require("jsonwebtoken")

const userController = require("../controllers/userController");

const router = express.Router()

const getUser = (req) => {
    const header = req.headers["authorization"];
    const token = header.split(" ")[1];
    const user = jwt.decode(token);
    return user;
};

router.get("/", asyncHandler(async (req, res) => {
    const user = req.username
    let result = await userController.getUser(user)
    res.status(200).send(result)
}))

router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(400).json({ message: err.message });
});

module.exports = router