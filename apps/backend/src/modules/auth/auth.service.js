const bcrypt = require("bcryptjs")

const AppError = require("../../core/AppError")

const authRepository = require("./auth.repository")

const tokenService = require("../../shared/services/token.service")

const registerUser = async (payload) => {
  const existingUser = await authRepository.findByEmail(
    payload.email
  )

  if (existingUser) {
    throw new AppError("Email already exists", 400)
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    12
  )

  delete payload.confirmPassword

  const user = await authRepository.createUser({
    ...payload,
    password: hashedPassword,
  })

  const userObject = user.toObject()

  delete userObject.password

  return userObject
}

const loginUser = async (payload) => {
    const existingUser =
      await authRepository.findByEmail(
        payload.email
      )
  
    if (!existingUser) {
      throw new AppError(
        "Invalid email or password",
        401
      )
    }
  
    const isPasswordCorrect =
      await bcrypt.compare(
        payload.password,
        existingUser.password
      )
  
    if (!isPasswordCorrect) {
      throw new AppError(
        "Invalid email or password",
        401
      )
    }
  
    const tokenPayload = {
      userId: existingUser._id,
      role: existingUser.role,
    }
  
    const accessToken =
      tokenService.generateAccessToken(
        tokenPayload
      )
  
    const refreshToken =
      tokenService.generateRefreshToken(
        tokenPayload
      )
  
    const userObject =
      existingUser.toObject()
  
    delete userObject.password
  
    return {
      user: userObject,
      accessToken,
      refreshToken,
    }
  }
module.exports = {
  registerUser,
  loginUser,
}