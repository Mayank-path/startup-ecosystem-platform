const asyncHandler = require("../../core/asyncHandler")
const ApiResponse = require("../../core/ApiResponse")

const startupService = require("./startup.service")

const createStartup = asyncHandler(async (req, res) => {
  const startup = await startupService.createStartup(
    req.user,
    req.body
  )

  return ApiResponse.created(
    res,
    startup,
    "Startup created successfully"
  )
})

const getAllStartups = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 6
  const search = req.query.search || ""

  const startups =
    await startupService.getAllStartups({
      page,
      limit,
      search,
    })

  return ApiResponse.success(
    res,
    startups,
    "Startups fetched successfully"
  )
})

const getStartupById = asyncHandler(async (req, res) => {
  const startup = await startupService.getStartupById(
    req.params.id
  )

  return ApiResponse.success(
    res,
    startup,
    "Startup fetched successfully"
  )
})

const getMyStartups = asyncHandler(async (req, res) => {
  const startups =
    await startupService.getMyStartups(req.user)

  return ApiResponse.success(
    res,
    startups,
    "My startups fetched successfully"
  )
})

const updateStartup = asyncHandler(async (req, res) => {
  const startup =
    await startupService.updateStartup(
      req.user,
      req.params.id,
      req.body
    )

  return ApiResponse.success(
    res,
    startup,
    "Startup updated successfully"
  )
})

const deleteStartup = asyncHandler(async (req, res) => {
  await startupService.deleteStartup(
    req.user,
    req.params.id
  )

  return ApiResponse.success(
    res,
    null,
    "Startup deleted successfully"
  )
})

const uploadStartupLogo = asyncHandler(
  async (req, res) => {
    const startup =
      await startupService.uploadStartupLogo(
        req.user,
        req.params.id,
        req.file
      )

    return ApiResponse.success(
      res,
      startup,
      "Startup logo uploaded successfully"
    )
  }
)

module.exports = {
  createStartup,
  getAllStartups,
  getStartupById,
  getMyStartups,
  updateStartup,
  deleteStartup,
  uploadStartupLogo,
}