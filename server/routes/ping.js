const express = require("express")
const asyncHandler = require("../asyncHandler")
const pingController = require("../controllers/pingController")

const router = express.Router()

router.post("/", asyncHandler(async (req, res) => {
    await pingController.createPing()
    res.status(200).send({message: "Success"})
}))

router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.log(err)
    res.status(401).json({ message: err.message });
});

module.exports = router