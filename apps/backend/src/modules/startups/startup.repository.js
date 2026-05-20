const Startup = require("./startup.schema")

const createStartup = (payload) => {
  return Startup.create(payload)
}

const findAllStartups = () => {
  return Startup.find()
    .populate("founder", "name email avatar role")
    .sort({ createdAt: -1 })
}

const findStartupById = (id) => {
  return Startup.findById(id).populate(
    "founder",
    "name email avatar role"
  )
}

const findStartupsByFounder = (founderId) => {
  return Startup.find({
    founder: founderId,
  }).sort({
    createdAt: -1,
  })
}

const updateStartupById = (id, payload) => {
  return Startup.findByIdAndUpdate(id, payload, {
    new: true,
  })
}

const deleteStartupById = (id) => {
  return Startup.findByIdAndDelete(id)
}

const updateStartupLogo = (id, logoUrl) => {
  return Startup.findByIdAndUpdate(
    id,
    {
      logo: logoUrl,
    },
    {
      new: true,
    }
  )
}

module.exports = {
  createStartup,
  findAllStartups,
  findStartupById,
  findStartupsByFounder,
  updateStartupById,
  deleteStartupById,
  updateStartupLogo,
}