const AppError = require("../../core/AppError")

const startupRepository = require("../startups/startup.repository")

const jobRepository = require("./job.repository")

const createJob = async (
  user,
  payload
) => {
  const startup =
    await startupRepository.findStartupById(
      payload.startup
    )

  if (!startup) {
    throw new AppError(
      "Startup not found",
      404
    )
  }

  const isFounder =
    startup.founder._id.toString() ===
    user.userId

  if (
    !isFounder &&
    user.role !== "ADMIN"
  ) {
    throw new AppError(
      "Unauthorized to post jobs for this startup",
      403
    )
  }

  return jobRepository.createJob(payload)
}

const getJobs = async () => {
  return jobRepository.findJobs()
}

const getJobById = async (id) => {
  const job =
    await jobRepository.findJobById(id)

  if (!job) {
    throw new AppError(
      "Job not found",
      404
    )
  }

  return job
}

const getJobsByStartup = async (
  startupId
) => {
  return jobRepository.findJobsByStartup(
    startupId
  )
}

module.exports = {
  createJob,
  getJobs,
  getJobById,
  getJobsByStartup,
}