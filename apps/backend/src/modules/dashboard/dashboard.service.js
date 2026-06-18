const Job = require("../jobs/job.model")

const Startup = require("../startups/startup.schema")

const Application = require(
  "../applications/application.model"
)

const getDashboardStats = async (user) => {
  const totalJobs = await Job.countDocuments({
    isActive: true,
  })

  const totalStartups =
    await Startup.countDocuments()

  let totalApplications = 0

  if (user.role === "STUDENT") {
    totalApplications =
      await Application.countDocuments({
        student: user.userId,
      })
  } else {
    totalApplications =
      await Application.countDocuments()
  }

  return {
    totalJobs,
    totalStartups,
    totalApplications,
  }
}

module.exports = {
  getDashboardStats,
}