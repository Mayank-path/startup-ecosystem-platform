const Startup = require("./startup.schema")

const createStartup = (payload) => {
  return Startup.create(payload)
}

const findAllStartups = async ({
  page,
  limit,
  search,
}) => {
  const skip = (page - 1) * limit

  const query = {}

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        industry: {
          $regex: search,
          $options: "i",
        },
      },
      {
        location: {
          $regex: search,
          $options: "i",
        },
      },
      {
        tagline: {
          $regex: search,
          $options: "i",
        },
      },
    ]
  }

  const startups = await Startup.find(query)
    .populate(
      "founder",
      "name email avatar role"
    )
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit)

  const totalStartups =
    await Startup.countDocuments(query)

  const totalPages = Math.ceil(
    totalStartups / limit
  )

  return {
    startups,
    currentPage: page,
    totalPages,
    totalStartups,
  }
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