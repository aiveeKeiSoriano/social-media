require("dotenv").config()

const PORT = 3333

const mongoose = require("mongoose")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const jwt = require("jsonwebtoken")

const authRouter = require("./routes/auth")
const meRouter = require("./routes/me")

const app = express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

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
        jwt.decode(token);
        next()
    }
    catch (e) {
        console.log(e.message)
        res.status(403).json({message: e.message})
    }
}

app.use("/auth", authRouter)
app.use("/me", verifyToken, meRouter)

app.get("/", (req, res) => {
    res.status(200).send("Welcome to backend")
})

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Connected to mongodb'))

app.listen(PORT, () => console.log("Listening to http://localhost:" + PORT))