const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body)

    next()
  } catch (error) {
    console.log(error)

    return res.status(400).json({
      success: false,
      errors: error.issues,
    })
  }
}

module.exports = validate