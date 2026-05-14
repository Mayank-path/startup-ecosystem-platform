const router = require("express").Router()

const authRoutes = require("../modules/auth/auth.routes")

router.use("/auth", authRoutes)

router.get("/", (req, res) => {
  res.json({
    message: "API v1 Running",
  })
})

module.exports = router