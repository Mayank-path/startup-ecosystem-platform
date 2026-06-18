const router = require("express").Router()

const authRoutes = require("../modules/auth/auth.routes")

const usersRoutes = require("../modules/users/users.routes")

const startupRoutes = require("../modules/startups/startup.routes")

const jobRoutes = require("../modules/jobs/job.routes")

const applicationRoutes = require(
  "../modules/applications/application.routes"
)

const dashboardRoutes = require("../modules/dashboard/dashboard.routes")

router.use("/auth", authRoutes)

router.use("/users", usersRoutes)

router.use("/startups", startupRoutes)

router.use("/jobs", jobRoutes)

router.use(
  "/applications",
  applicationRoutes
)

router.use("/dashboard", dashboardRoutes)

router.get("/", (req, res) => {
  res.json({
    message: "API v1 Running",
  })
})

module.exports = router