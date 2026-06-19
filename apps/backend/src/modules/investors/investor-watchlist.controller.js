const asyncHandler = require("../../core/asyncHandler")
const ApiResponse = require("../../core/ApiResponse")
const investorWatchlistService = require("./investor-watchlist.service")

const addToWatchlist = asyncHandler(async (req, res) => {
  const data = await investorWatchlistService.addToWatchlist(
    req.user,
    req.params.startupId
  )

  return ApiResponse.success(
    res,
    data,
    "Startup added to watchlist"
  )
})

const checkWatchlistStatus = asyncHandler(async (req, res) => {
    const data = await investorWatchlistService.checkWatchlistStatus(
      req.user,
      req.params.startupId
    )
  
    return ApiResponse.success(
      res,
      data,
      "Watchlist status fetched"
    )
  })

const getMyWatchlist = asyncHandler(async (req, res) => {
  const data = await investorWatchlistService.getMyWatchlist(req.user)

  return ApiResponse.success(
    res,
    data,
    "Watchlist fetched successfully"
  )
})

const removeFromWatchlist = asyncHandler(async (req, res) => {
  const data = await investorWatchlistService.removeFromWatchlist(
    req.user,
    req.params.startupId
  )

  return ApiResponse.success(
    res,
    data,
    "Startup removed from watchlist"
  )
})

module.exports = {
  addToWatchlist,
  getMyWatchlist,
  removeFromWatchlist,
  checkWatchlistStatus,
}