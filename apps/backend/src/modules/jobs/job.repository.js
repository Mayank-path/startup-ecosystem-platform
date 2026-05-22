const Job = require("./job.model")

const createJob = (payload) => {
  return Job.create(payload)
}

const findJobs = () => {
  return Job.find({
    isActive: true,
  })
    .populate(
      "startup",
      "name logo tagline"
    )
    .sort({
      createdAt: -1,
    })
}

const findJobById = (id) => {
  return Job.findById(id).populate(
    "startup"
  )
}

const findJobsByStartup = (startupId) => {
  return Job.find({
    startup: startupId,
  }).sort({
    createdAt: -1,
  })
}

const updateJob = (
  jobId,
  payload
) => {
  return Job.findByIdAndUpdate(
    jobId,
    payload,
    {
      new: true,
    }
  )
}

const deleteJob = (jobId) => {
  return Job.findByIdAndDelete(
    jobId
  )
}

module.exports = {
  createJob,
  findJobs,
  findJobById,
  findJobsByStartup,
  updateJob,
  deleteJob,
}