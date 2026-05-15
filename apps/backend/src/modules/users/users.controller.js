const usersService = require("./users.service")

const asyncHandler = require("../../core/asyncHandler")

const ApiResponse = require("../../core/ApiResponse")

const getMyProfile = asyncHandler(
  async (req, res) => {
    const data =
      await usersService.getMyProfile(
        req.user.userId
      )

    return ApiResponse.success(
      res,
      data,
      "Profile fetched successfully"
    )
  }
)

const updateMyProfile = asyncHandler(
    async (req, res) => {
      const data =
        await usersService.updateMyProfile(
          req.user.userId,
          req.body
        )
  
      return ApiResponse.success(
        res,
        data,
        "Profile updated successfully"
      )
    }
)

const uploadAvatar = asyncHandler(
  async (req, res) => {
    const data =
      await usersService.uploadAvatar(
        req.user.userId,
        req.file
      )

    return ApiResponse.success(
      res,
      data,
      "Avatar uploaded successfully"
    )
  }
)

module.exports = {
  getMyProfile,updateMyProfile,uploadAvatar
}