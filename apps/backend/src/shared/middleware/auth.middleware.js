const AppError = require("../../core/AppError")

const tokenService = require("../services/token.service")

const authRepository = require("../../modules/auth/auth.repository")

const authMiddleware = async (
  req,
  res,
  next
) => {
  try {
    const authHeader =
      req.headers.authorization

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      throw new AppError(
        "Unauthorized",
        401
      )
    }

    const token =
      authHeader.split(" ")[1]

    const decoded =
      tokenService.verifyAccessToken(token)

    const user =
      await authRepository.findById(
        decoded.userId
      ).select("-password")

    if (!user) {
      throw new AppError(
        "User not found",
        401
      )
    }

    req.user = user

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authMiddleware