const AppError = require("../../core/AppError")

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "Forbidden: insufficient permissions",
          403
        )
      )
    }

    next()
  }
}

module.exports = authorizeRoles