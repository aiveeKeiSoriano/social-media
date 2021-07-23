const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const asyncHandler = require("../asyncHandler")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const multipart = multer({ storage: storage });

const userController = require("../controllers/userController");
const tokenController = require("../controllers/tokenController");

const router = express.Router();

router.post("/signup", multipart.single("picture"), asyncHandler(async (req, res, next) => {
    req.body.picture = req.file?.filename;
    const result = await userController.createNewUser(req.body)
    res.status(201).json(result)
}));

router.post("/signin", asyncHandler(async (req, res) => {
    const user = await userController.checkUser(req.body);
    const payload = { email: user.email };
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
    });
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
    });
    await tokenController.addNewToken({ refresh_token, email: user.email });
    res.status(200).json({ access_token, refresh_token });
}));

router.post("/signout", asyncHandler(async (req, res) => {
    const { refresh_token } = req.body;
    const result = await tokenController.removeToken(refresh_token);
    res.status(201).json({ message: "Signed-out successfully" });
}));

router.post("/token", asyncHandler(async (req, res) => {
    const { refresh_token } = req.body;
    let user
    try {
        user = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
    }
    catch (e) {
        res.status(403).json({ message: "refresh token expired" })
    }
    await tokenController.checkToken(refresh_token);
    let access_token = jwt.sign(
        { email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
    );
    res.status(200).json({ access_token });
}));

router.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(401).json({ message: err.message });
});

module.exports = router;
