require("dotenv").config()

const PORT = process.env.PORT || 3333

const mongoose = require("mongoose")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const fs = require('fs')

const authRouter = require("./routes/auth")
const meRouter = require("./routes/me")
const postRouter = require("./routes/post")
const usersRouter = require("./routes/users")
const pingRouter = require("./routes/ping")
const klaviyoRouter = require("./routes/klaviyo")

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())
app.use(express.static('static'))

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to mongodb'))

const verifyToken = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        console.log("Authorization header required")
        res.status(403).json({message: "Authorization header required"})
    }
    const token = header.split(" ")[1];
    if (!token) {
        console.log("Access token required")
        res.status(403).json({message: "Access token required"})
    }
    try {
        let user = jwt.decode(token);
        req.username = user.username
        next()
    }
    catch (e) {
        console.log(e.message)
        res.status(403).json({message: e.message})
    }
}

app.use("/auth", authRouter)
app.use("/ping", pingRouter)
app.use("/me", verifyToken, meRouter)
app.use("/posts", verifyToken, postRouter)
app.use("/users", verifyToken, usersRouter)
app.use("/klaviyo", klaviyoRouter)

app.get("/", (req, res) => {
    res.status(200).sendFile(__dirname + "/README.md")
})

app.listen(PORT, () => console.log("Listening to http://localhost:" + PORT))