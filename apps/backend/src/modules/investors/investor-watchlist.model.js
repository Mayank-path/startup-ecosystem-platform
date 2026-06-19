const mongoose = require("mongoose")

const investorWatchlistSchema = new mongoose.Schema(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

investorWatchlistSchema.index(
  {
    investor: 1,
    startup: 1,
  },
  {
    unique: true,
  }
)

module.exports = mongoose.model(
  "InvestorWatchlist",
  investorWatchlistSchema
)