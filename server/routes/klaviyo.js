const express = require("express")
const asyncHandler = require("../asyncHandler")
const klaviyoController = require("../controllers/klaviyoController")

const router = express.Router()

router.post("/order-confirmation", asyncHandler(async (req, res) => {
    const result = await klaviyoController.sendOrderConfirmation(req.body)
    res.status(200).send(result)
}))

router.post("/payment-confirmation", asyncHandler(async (req, res) => {
    const result = await klaviyoController.sendPaymentConfirmation(req.body)
    res.status(200).send(result)
}))

router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.log(err)
    res.status(401).json({ message: err.message });
});

module.exports = router