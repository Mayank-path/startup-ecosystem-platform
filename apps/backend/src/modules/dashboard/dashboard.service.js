const Job = require("../jobs/job.model")
const Startup = require("../startups/startup.schema")
const Application = require("../applications/application.model")

const getDashboardStats = async (user) => {
  const totalStartups = await Startup.countDocuments()

  let totalJobs = 0
  let totalApplications = 0
  let pendingApplications = 0
  let acceptedApplications = 0
  let rejectedApplications = 0

  if (user.role === "STUDENT") {
    totalApplications = await Application.countDocuments({
      student: user.userId,
    })

    pendingApplications = await Application.countDocuments({
      student: user.userId,
      status: "PENDING",
    })

    acceptedApplications = await Application.countDocuments({
      student: user.userId,
      status: "ACCEPTED",
    })

    rejectedApplications = await Application.countDocuments({
      student: user.userId,
      status: "REJECTED",
    })

    totalJobs = acceptedApplications
  } else {
    totalJobs = await Job.countDocuments({
      isActive: true,
    })

    totalApplications = await Application.countDocuments()
  }

  return {
    totalJobs,
    totalStartups,
    totalApplications,
    pendingApplications,
    acceptedApplications,
    rejectedApplications,
  }
}

module.exports = {
  getDashboardStats,
}