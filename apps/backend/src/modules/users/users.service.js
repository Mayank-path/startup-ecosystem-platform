const AppError = require("../../core/AppError")

const usersRepository = require("./users.repository")

const cloudinary = require(
  "../../shared/upload/cloudinary"
)

const getMyProfile = async (userId) => {
  const user =
    await usersRepository.findUserById(
      userId
    )

  if (!user) {
    throw new AppError(
      "User not found",
      404
    )
  }

  return user
}

const updateMyProfile = async (
    userId,
    payload
  ) => {
    const updatedUser =
      await usersRepository.updateUserById(
        userId,
        payload
      )
  
    if (!updatedUser) {
      throw new AppError(
        "User not found",
        404
      )
    }
  
    return updatedUser
}

const uploadAvatar = async (
  userId,
  file
) => {
  if (!file) {
    throw new AppError(
      "Image file is required",
      400
    )
  }

  const base64 =
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`

  const uploadedImage =
    await cloudinary.uploader.upload(
      base64,
      {
        folder: "startup_ecosystem/avatars",
      }
    )

  const updatedUser =
    await usersRepository.updateAvatar(
      userId,
      uploadedImage.secure_url
    )

  return updatedUser
}

module.exports = {
  getMyProfile,updateMyProfile,uploadAvatar
}