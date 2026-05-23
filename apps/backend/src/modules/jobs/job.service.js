const AppError = require("../../core/AppError")

const startupRepository = require("../startups/startup.repository")
const jobRepository = require("./job.repository")
const Application = require("../applications/application.model")

const createJob = async (user, payload) => {
  const startup = await startupRepository.findStartupById(payload.startup)

  if (!startup) {
    throw new AppError("Startup not found", 404)
  }

  const isFounder = startup.founder._id.toString() === user.userId

  if (!isFounder && user.role !== "ADMIN") {
    throw new AppError("Unauthorized to post jobs for this startup", 403)
  }

  return jobRepository.createJob(payload)
}

const getJobs = async ({
  page,
  limit,
  search,
}) => {
  return jobRepository.findJobs({
    page,
    limit,
    search,
  })
}

const getJobById = async (id) => {
  const job = await jobRepository.findJobById(id)

  if (!job) {
    throw new AppError("Job not found", 404)
  }

  return job
}

const getJobsByStartup = async (startupId) => {
  return jobRepository.findJobsByStartup(startupId)
}

const updateJob = async (user, jobId, payload) => {
  const job = await jobRepository.findJobById(jobId)

  if (!job) {
    throw new AppError("Job not found", 404)
  }

  const founderId = job.startup.founder.toString()
  const isFounder = founderId === user.userId

  if (!isFounder && user.role !== "ADMIN") {
    throw new AppError("Unauthorized to update this job", 403)
  }

  return jobRepository.updateJob(jobId, payload)
}

const deleteJob = async (user, jobId) => {
  const job = await jobRepository.findJobById(jobId)

  if (!job) {
    throw new AppError("Job not found", 404)
  }

  const founderId = job.startup.founder.toString()
  const isFounder = founderId === user.userId

  if (!isFounder && user.role !== "ADMIN") {
    throw new AppError("Unauthorized to delete this job", 403)
  }

  await Application.deleteMany({
    job: jobId,
  })

  await jobRepository.deleteJob(jobId)

  return null
}

module.exports = {
  createJob,
  getJobs,
  getJobById,
  getJobsByStartup,
  updateJob,
  deleteJob,
}