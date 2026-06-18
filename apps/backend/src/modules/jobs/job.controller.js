const asyncHandler = require("../../core/asyncHandler")
const ApiResponse = require("../../core/ApiResponse")

const jobService = require("./job.service")

const createJob = asyncHandler(async (req, res) => {
  const job = await jobService.createJob(
    req.user,
    req.body
  )

  return ApiResponse.success(
    res,
    job,
    "Job created successfully",
    201
  )
})

const getJobs = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 6
  const search = req.query.search || ""
  const sort = req.query.sort || "newest"

  const result = await jobService.getJobs({
    page,
    limit,
    search,
    sort,
  })

  return ApiResponse.success(
    res,
    result,
    "Jobs fetched successfully"
  )
})

const getJobById = asyncHandler(async (req, res) => {
  const job = await jobService.getJobById(
    req.params.id
  )

  return ApiResponse.success(
    res,
    job,
    "Job fetched successfully"
  )
})

const getJobsByStartup = asyncHandler(async (req, res) => {
  const jobs = await jobService.getJobsByStartup(
    req.params.startupId
  )

  return ApiResponse.success(
    res,
    jobs,
    "Startup jobs fetched successfully"
  )
})

const updateJob = asyncHandler(async (req, res) => {
  const job = await jobService.updateJob(
    req.user,
    req.params.id,
    req.body
  )

  return ApiResponse.success(
    res,
    job,
    "Job updated successfully"
  )
})

const deleteJob = asyncHandler(async (req, res) => {
  await jobService.deleteJob(
    req.user,
    req.params.id
  )

  return ApiResponse.success(
    res,
    null,
    "Job deleted successfully"
  )
})

module.exports = {
  createJob,
  getJobs,
  getJobById,
  getJobsByStartup,
  updateJob,
  deleteJob,
}