const router = require("express").Router()

const authController = require("./auth.controller")

const validate = require("../../shared/middleware/validate.middleware")

const { registerSchema,loginSchema, refreshTokenSchema } = require("./auth.validation")

const authMiddleware = require("../../shared/middleware/auth.middleware")

router.post(
  "/register",
  validate(registerSchema),
  authController.register
)

router.post(
    "/login",
    validate(loginSchema),
    authController.login
)

router.get(
    "/me",
    authMiddleware,
    authController.getCurrentUser
)

router.post(
    "/refresh-token",
    validate(refreshTokenSchema),
    authController.refreshToken
)

router.post(
    "/logout",
    authController.logout
  )

module.exports = router