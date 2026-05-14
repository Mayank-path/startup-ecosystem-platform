const asyncHandler = require("../../core/asyncHandler")
const ApiResponse = require("../../core/ApiResponse")

const authService = require("./auth.service")

const register = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body)

  return ApiResponse.created(
    res,
    user,
    "User registered successfully"
  )
})

const login = asyncHandler(async (req, res) => {
    const data = await authService.loginUser(
      req.body
    )
  
    return ApiResponse.success(
      res,
      data,
      "Login successful"
    )
  })
  
  const getCurrentUser = asyncHandler(
    async (req, res) => {
      return ApiResponse.success(
        res,
        req.user,
        "Current user fetched"
      )
    }
  )

module.exports = {
  register,login,getCurrentUser
}