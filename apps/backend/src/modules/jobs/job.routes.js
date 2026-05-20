const express = require("express")

const router = express.Router()

const authMiddleware = require(
  "../../shared/middleware/auth.middleware"
)

const validate = require(
  "../../shared/middleware/validate.middleware"
)

const {
  createJobSchema,
} = require("./job.validation")

const jobController = require(
  "./job.controller"
)

router.get(
  "/",
  jobController.getJobs
)

router.get(
  "/:id",
  jobController.getJobById
)

router.get(
  "/startup/:startupId",
  jobController.getJobsByStartup
)

router.post(
  "/",
  authMiddleware,
  validate(createJobSchema),
  jobController.createJob
)

module.exports = router