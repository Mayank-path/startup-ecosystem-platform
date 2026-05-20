const mongoose = require("mongoose")

const applicationSchema =
  new mongoose.Schema(
    {
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
      },

      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      coverLetter: {
        type: String,
        default: "",
      },

      resume: {
        type: String,
        default: "",
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "REVIEWED",
          "ACCEPTED",
          "REJECTED",
        ],
        default: "PENDING",
      },
    },
    {
      timestamps: true,
    }
  )

module.exports = mongoose.model(
  "Application",
  applicationSchema
)