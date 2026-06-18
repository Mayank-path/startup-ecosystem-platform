const Job = require("./job.model")

const createJob = (payload) => {
  return Job.create(payload)
}

const findJobs = async ({
  page,
  limit,
  search,
  sort,
}) => {
  const skip = (page - 1) * limit

  const query = {
    isActive: true,
  }

  if (search) {
    query.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        location: {
          $regex: search,
          $options: "i",
        },
      },
    ]
  }

  let sortOption = {
    createdAt: -1,
  }

  if (sort === "oldest") {
    sortOption = {
      createdAt: 1,
    }
  }

  const jobs = await Job.find(query)
    .populate(
      "startup",
      "name logo tagline"
    )
    .sort(sortOption)
    .skip(skip)
    .limit(limit)

  const totalJobs =
    await Job.countDocuments(query)

  const totalPages = Math.ceil(
    totalJobs / limit
  )

  return {
    jobs,
    currentPage: page,
    totalPages,
    totalJobs,
  }
}

const findJobById = (id) => {
  return Job.findById(id).populate(
    "startup"
  )
}

const findJobsByStartup = (
  startupId
) => {
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