const AppError = require("../../core/AppError")
const Startup = require("../startups/startup.schema")
const InvestorWatchlist = require("./investor-watchlist.model")

const addToWatchlist = async (user, startupId) => {
  if (user.role !== "INVESTOR") {
    throw new AppError("Only investors can save startups", 403)
  }

  const startup = await Startup.findById(startupId)

  if (!startup) {
    throw new AppError("Startup not found", 404)
  }

  const existing = await InvestorWatchlist.findOne({
    investor: user.userId,
    startup: startupId,
  })

  if (existing) {
    return existing
  }

  return InvestorWatchlist.create({
    investor: user.userId,
    startup: startupId,
  })
}

const checkWatchlistStatus = async (user, startupId) => {
  if (user.role !== "INVESTOR") {
    throw new AppError("Only investors can check watchlist", 403)
  }

  const saved = await InvestorWatchlist.findOne({
    investor: user.userId,
    startup: startupId,
  })

  return {
    isSaved: Boolean(saved),
  }
}

const getMyWatchlist = async (user) => {
  if (user.role !== "INVESTOR") {
    throw new AppError("Only investors can view watchlist", 403)
  }

  return InvestorWatchlist.find({
    investor: user.userId,
  })
    .populate("startup")
    .sort({ createdAt: -1 })
}

const removeFromWatchlist = async (user, startupId) => {
  if (user.role !== "INVESTOR") {
    throw new AppError("Only investors can remove startups", 403)
  }

  const removed = await InvestorWatchlist.findOneAndDelete({
    investor: user.userId,
    startup: startupId,
  })

  if (!removed) {
    throw new AppError("Startup not found in watchlist", 404)
  }

  return removed
}

module.exports = {
  addToWatchlist,
  getMyWatchlist,
  removeFromWatchlist,
  checkWatchlistStatus
}