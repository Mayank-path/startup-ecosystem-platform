const User = require("./auth.schema")

const findByEmail = (email) => {
  return User.findOne({ email })
}

const createUser = (payload) => {
  return User.create(payload)
}

const findById = (id) => {
    return User.findById(id)
  }

module.exports = {
  findByEmail,
  createUser,
  findById,
}