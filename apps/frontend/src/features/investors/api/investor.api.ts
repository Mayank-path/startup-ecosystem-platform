import api from "../../../lib/axios"

export const addToWatchlist = (startupId: string) => {
  return api.post(`/investors/watchlist/${startupId}`)
}

export const getInvestorWatchlist = () => {
  return api.get("/investors/watchlist")
}

export const removeFromWatchlist = (startupId: string) => {
  return api.delete(`/investors/watchlist/${startupId}`)
}

export const checkWatchlistStatus = (startupId: string) => {
    return api.get(`/investors/watchlist/check/${startupId}`)
}