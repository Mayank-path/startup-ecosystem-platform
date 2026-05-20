const AppError = require(
    "../../core/AppError"
  )
  
  const applicationRepository = require(
    "./application.repository"
  )
  
  const jobRepository = require(
    "../jobs/job.repository"
  )
  
  const applyJob = async (
    user,
    payload
  ) => {
    if (user.role !== "STUDENT") {
      throw new AppError(
        "Only students can apply",
        403
      )
    }
  
    const job =
      await jobRepository.findJobById(
        payload.job
      )
  
    if (!job) {
      throw new AppError(
        "Job not found",
        404
      )
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
  
    return applicationRepository.createApplication(
      {
        ...payload,
        student: user.userId,
      }
    )
  }
  
  const getMyApplications =
    async (user) => {
      return applicationRepository.findApplicationsByStudent(
        user.userId
      )
    }
  
  const getApplicationsByJob =
    async (jobId) => {
      return applicationRepository.findApplicationsByJob(
        jobId
      )
    }
  
  module.exports = {
    applyJob,
    getMyApplications,
    getApplicationsByJob,
  }