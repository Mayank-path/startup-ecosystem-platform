const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const compression = require("compression")
const cookieParser = require("cookie-parser")

const routes = require("./routes")
const errorMiddleware = require("./shared/middleware/error.middleware")

const app = express()

app.use(express.json())

app.use(cookieParser())

app.use(helmet())

app.use(compression())

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use("/api", routes)

app.use(errorMiddleware)

module.exports = app