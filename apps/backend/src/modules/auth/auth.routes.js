const router = require("express").Router()

const authController = require("./auth.controller")

const validate = require("../../shared/middleware/validate.middleware")

const { registerSchema,loginSchema } = require("./auth.validation")

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

module.exports = router