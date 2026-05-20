const AppError = require("../../core/AppError")

const startupRepository = require("./startup.repository")

const cloudinary = require("../../shared/upload/cloudinary")

const createStartup = async (user, payload) => {
  if (
    user.role !== "ENTREPRENEUR" &&
    user.role !== "ADMIN"
  ) {
    throw new AppError(
      "Only entrepreneurs can create startups",
      403
    )
  }

  const startup = await startupRepository.createStartup({
    ...payload,
    founder: user.userId,
  })

  return startup
}

const getAllStartups = async () => {
  return startupRepository.findAllStartups()
}

const getStartupById = async (id) => {
  const startup =
    await startupRepository.findStartupById(id)

  if (!startup) {
    throw new AppError("Startup not found", 404)
  }

  return startup
}

const getMyStartups = async (user) => {
  return startupRepository.findStartupsByFounder(
    user.userId
  )
}

const updateStartup = async (
  user,
  startupId,
  payload
) => {
  const startup =
    await startupRepository.findStartupById(
      startupId
    )

  if (!startup) {
    throw new AppError("Startup not found", 404)
  }

  const isFounder =
    startup.founder._id.toString() === user.userId

  if (
    !isFounder &&
    user.role !== "ADMIN"
  ) {
    throw new AppError(
      "Unauthorized to update startup",
      403
    )
  }

  return startupRepository.updateStartupById(
    startupId,
    payload
  )
}

const deleteStartup = async (
  user,
  startupId
) => {
  const startup =
    await startupRepository.findStartupById(
      startupId
    )

  if (!startup) {
    throw new AppError("Startup not found", 404)
  }

  const isFounder =
    startup.founder._id.toString() === user.userId

  if (
    !isFounder &&
    user.role !== "ADMIN"
  ) {
    throw new AppError(
      "Unauthorized to delete startup",
      403
    )
  }
  
  await startupRepository.deleteStartupById(
    startupId
  )
}

const uploadStartupLogo = async (
  user,
  startupId,
  file
) => {
  if (!file) {
    throw new AppError(
      "Logo image is required",
      400
    )
  }

  const startup =
    await startupRepository.findStartupById(
      startupId
    )

  if (!startup) {
    throw new AppError("Startup not found", 404)
  }

  const isFounder =
    startup.founder._id.toString() === user.userId

  if (
    !isFounder &&
    user.role !== "ADMIN"
  ) {
    throw new AppError(
      "Unauthorized to update startup logo",
      403
    )
  }

  const base64 =
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`

  const uploadedImage =
    await cloudinary.uploader.upload(
      base64,
      {
        folder: "startup_ecosystem/startup_logos",
      }
    )

  return startupRepository.updateStartupLogo(
    startupId,
    uploadedImage.secure_url
  )
}

module.exports = {
  createStartup,
  getAllStartups,
  getStartupById,
  getMyStartups,
  updateStartup,
  deleteStartup,
  uploadStartupLogo,
}