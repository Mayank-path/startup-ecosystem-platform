const router = require("express").Router()

const authRoutes = require("../modules/auth/auth.routes")

const usersRoutes = require("../modules/users/users.routes")

router.use("/auth", authRoutes)

router.use("/users", usersRoutes)

router.get("/", (req, res) => {
  res.json({
    message: "API v1 Running",
  })
})

module.exports = router