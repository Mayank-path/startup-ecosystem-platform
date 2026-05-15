const AppError = require("../../core/AppError")

const tokenService = require("../services/token.service")

const authMiddleware = (
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
      tokenService.verifyAccessToken(
        token
      )

    req.user = decoded

    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authMiddleware