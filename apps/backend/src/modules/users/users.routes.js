const router = require("express").Router()

const usersController = require("./users.controller")

const authMiddleware = require("../../shared/middleware/auth.middleware")

const {
    updateProfileSchema,
} = require("./users.validation")

const validate = require("../../shared/middleware/validate.middleware")

const upload = require("../../shared/upload/multer")

router.get(
  "/me",
  authMiddleware,
  usersController.getMyProfile
)

router.patch(
    "/me",
    authMiddleware,
    validate(updateProfileSchema),
    usersController.updateMyProfile
)

router.patch(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  usersController.uploadAvatar
)


module.exports = router