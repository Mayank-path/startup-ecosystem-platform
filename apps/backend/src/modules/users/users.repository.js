const User = require("../auth/auth.schema.js")

const findUserById = (id) => {
  return User.findById(id).select(
    "-password"
  )
}

const updateUserById = (id, payload) => {
    return User.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password")
}

const updateAvatar = (id, avatarUrl) => {
  return User.findByIdAndUpdate(
    id,
    {
      avatar: avatarUrl,
    },
    {
      new: true,
    }
  ).select("-password")
}

module.exports = {
  findUserById,updateUserById,updateAvatar
}   