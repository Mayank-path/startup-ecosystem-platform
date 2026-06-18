const express = require("express")

const router = express.Router()

const dashboardController = require(
  "./dashboard.controller"
)

const authMiddleware = require(
  "../../shared/middleware/auth.middleware"
)

router.get(
  "/stats",
  authMiddleware,
  dashboardController.getDashboardStats
)

module.exports = router