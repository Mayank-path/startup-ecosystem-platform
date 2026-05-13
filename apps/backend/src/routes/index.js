const router = require("express").Router()

router.get("/", (req, res) => {
  res.json({
    message: "API v1 Running",
  })
})

module.exports = router