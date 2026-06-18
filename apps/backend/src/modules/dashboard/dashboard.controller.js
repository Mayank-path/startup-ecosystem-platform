const asyncHandler = require("../../core/asyncHandler")

const ApiResponse = require("../../core/ApiResponse")

const dashboardService = require("./dashboard.service")

const getDashboardStats = asyncHandler(
  async (req, res) => {
    const stats =
      await dashboardService.getDashboardStats(
        req.user
      )

    return ApiResponse.success(
      res,
      stats,
      "Dashboard stats fetched successfully"
    )
  }
)

module.exports = {
  getDashboardStats,
}