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
  
    res.cookie(
      "refreshToken",
      data.refreshToken,
      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge:
          7 * 24 * 60 * 60 * 1000,
      }
    )
  
    delete data.refreshToken
  
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

  const refreshToken = asyncHandler(
    async (req, res) => {
        const refreshToken = req.cookies.refreshToken
  
      const data =
        await authService.refreshAccessToken(
          refreshToken
        )
  
      return ApiResponse.success(
        res,
        data,
        "Access token refreshed"
      )
    }
  )

  const logout = asyncHandler(
    async (req, res) => {
        res.clearCookie("refreshToken")
        
      return ApiResponse.success(
        res,
        null,
        "Logout successful"
      )
    }
  )

module.exports = {
  register,login,getCurrentUser,refreshToken,logout
}