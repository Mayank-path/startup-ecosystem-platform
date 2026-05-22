const AppError = require("../../core/AppError")

const applicationRepository = require("./application.repository")

const Application = require("./application.model")

const jobRepository = require("../jobs/job.repository")

const cloudinary = require("../../shared/upload/cloudinary")

const applyJob = async (user, payload) => {
  if (user.role !== "STUDENT") {
    throw new AppError("Only students can apply", 403)
  }

  const job = await jobRepository.findJobById(payload.job)

  if (!job) {
    throw new AppError("Job not found", 404)
  }

  const existingApplication =
    await applicationRepository.findApplication(
      user.userId,
      payload.job
    )

  if (existingApplication) {
    throw new AppError(
      "You already applied for this job",
      400
    )
  }

  return applicationRepository.createApplication({
    ...payload,
    student: user.userId,
  })
}

const getMyApplications = async (user) => {
  return applicationRepository.findApplicationsByStudent(
    user.userId
  )
}

const getApplicationsByJob = async (
  user,
  jobId
) => {
  const job =
    await jobRepository.findJobById(jobId)

  if (!job) {
    throw new AppError("Job not found", 404)
  }

  const founderId =
    job.startup.founder.toString()

  const isFounder =
    founderId === user.userId

  if (
    !isFounder &&
    user.role !== "ADMIN"
  ) {
    throw new AppError(
      "Unauthorized to view applicants",
      403
    )
  }

  return applicationRepository.findApplicationsByJob(
    jobId
  )
}

const updateApplicationStatus = async (
  user,
  applicationId,
  status
) => {
  const application =
    await Application.findById(
      applicationId
    ).populate({
      path: "job",
      populate: {
        path: "startup",
      },
    })

  if (!application) {
    throw new AppError(
      "Application not found",
      404
    )
  }

  const founderId =
    application.job.startup.founder.toString()

  const isFounder =
    founderId === user.userId

  if (
    !isFounder &&
    user.role !== "ADMIN"
  ) {
    throw new AppError(
      "Unauthorized to update application",
      403
    )
  }

  return applicationRepository.updateApplicationStatus(
    applicationId,
    status
  )
}

const uploadResume = async (
  user,
  applicationId,
  file
) => {
  if (user.role !== "STUDENT") {
    throw new AppError(
      "Only students can upload resume",
      403
    )
  }

  if (!file) {
    throw new AppError(
      "Resume PDF is required",
      400
    )
  }

  const application =
    await Application.findById(
      applicationId
    )

  if (!application) {
    throw new AppError(
      "Application not found",
      404
    )
  }

  if (
    application.student.toString() !==
    user.userId
  ) {
    throw new AppError(
      "Unauthorized to upload resume",
      403
    )
  }

  const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`

  const safeFileName =
    file.originalname
      .replace(".pdf", "")
      .replace(
        /[^a-zA-Z0-9-_]/g,
        "_"
      )

  const uploadedResume =
    await cloudinary.uploader.upload(
      base64,
      {
        folder:
          "startup_ecosystem/resumes",

        resource_type: "raw",

        public_id: `${safeFileName}_${Date.now()}`,

        format: "pdf",
      }
    )

  application.resume =
    uploadedResume.secure_url

  await application.save()

  return application
}

module.exports = {
  applyJob,
  getMyApplications,
  getApplicationsByJob,
  updateApplicationStatus,
  uploadResume,
}