const express = require("express")

const router = express.Router()

const authMiddleware = require("../../shared/middleware/auth.middleware")
const validate = require("../../shared/middleware/validate.middleware")
const uploadResume = require("../../shared/middleware/uploadResume.middleware")

const { applyJobSchema } = require("./application.validation")

const applicationController = require("./application.controller")

router.post(
  "/",
  authMiddleware,
  validate(applyJobSchema),
  applicationController.applyJob
)

router.get(
  "/me",
  authMiddleware,
  applicationController.getMyApplications
)

router.get(
  "/job/:jobId",
  authMiddleware,
  applicationController.getApplicationsByJob
)

router.patch(
  "/:id/status",
  authMiddleware,
  applicationController.updateApplicationStatus
)

router.patch(
  "/:id/resume",
  authMiddleware,
  uploadResume.single("resume"),
  applicationController.uploadResume
)

module.exports = router