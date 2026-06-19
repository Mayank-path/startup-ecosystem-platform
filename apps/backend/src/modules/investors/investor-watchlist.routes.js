const router = require("express").Router()

const authMiddleware = require("../../shared/middleware/auth.middleware")
const investorWatchlistController = require("./investor-watchlist.controller")

router.get(
  "/watchlist/check/:startupId",
  authMiddleware,
  investorWatchlistController.checkWatchlistStatus
)

router.get(
  "/watchlist",
  authMiddleware,
  investorWatchlistController.getMyWatchlist
)

router.post(
  "/watchlist/:startupId",
  authMiddleware,
  investorWatchlistController.addToWatchlist
)

router.delete(
  "/watchlist/:startupId",
  authMiddleware,
  investorWatchlistController.removeFromWatchlist
)

module.exports = router