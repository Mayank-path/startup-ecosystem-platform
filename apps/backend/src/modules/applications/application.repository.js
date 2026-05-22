const Application = require("./application.model")

const createApplication = (payload) => {
  return Application.create(payload)
}

const findApplication = (
  studentId,
  jobId
) => {
  return Application.findOne({
    student: studentId,
    job: jobId,
  })
}

const findApplicationsByStudent =
  (studentId) => {
    return Application.find({
      student: studentId,
    })
      .populate({
        path: "job",
        populate: {
          path: "startup",
          select: "name logo",
        },
      })
      .sort({
        createdAt: -1,
      })
  }

const findApplicationsByJob = (
  jobId
) => {
  return Application.find({
    job: jobId,
  })
    .populate(
      "student",
      "name email avatar"
    )
    .sort({
      createdAt: -1,
    })
}

const updateApplicationStatus = (
  applicationId,
  status
) => {
  return Application.findByIdAndUpdate(
    applicationId,
    {
      status,
    },
    {
      new: true,
    }
  )
}

module.exports = {
  createApplication,
  findApplication,
  findApplicationsByStudent,
  findApplicationsByJob,
  updateApplicationStatus,
}