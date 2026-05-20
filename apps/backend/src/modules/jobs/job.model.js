const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema(
  {
    startup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    roleType: {
      type: String,
      enum: [
        "FULL_TIME",
        "PART_TIME",
        "INTERNSHIP",
        "CONTRACT",
      ],
      default: "INTERNSHIP",
    },

    location: {
      type: String,
      default: "Remote",
    },

    skillsRequired: [
      {
        type: String,
      },
    ],

    salary: {
      type: String,
      default: "",
    },

    applicationDeadline: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(
  "Job",
  jobSchema
)