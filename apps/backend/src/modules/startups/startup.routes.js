const router = require("express").Router()

const startupController = require("./startup.controller")

const authMiddleware = require("../../shared/middleware/auth.middleware")
const validate = require("../../shared/middleware/validate.middleware")

const upload = require("../../shared/upload/multer")

const {
  createStartupSchema,
} = require("./startup.validation")

router.post(
  "/",
  authMiddleware,
  validate(createStartupSchema),
  startupController.createStartup
)

router.get("/", startupController.getAllStartups)

router.get(
  "/me",
  authMiddleware,
  startupController.getMyStartups
)

router.get("/:id", startupController.getStartupById)

router.patch(
  "/:id",
  authMiddleware,
  startupController.updateStartup
)

router.delete(
  "/:id",
  authMiddleware,
  startupController.deleteStartup
)

router.patch(
  "/:id/logo",
  authMiddleware,
  upload.single("logo"),
  startupController.uploadStartupLogo
)

module.exports = router