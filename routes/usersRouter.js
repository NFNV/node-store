const express = require("express")
const faker = require("faker")

const router = express.Router()

router.get("/", (req, res) => {
  const users = []
  const { size } = req.query
  const limit = size || 10

  for (let i = 0; i < limit; i++) {
    users.push({
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
      job: faker.name.jobArea(),
    })
  }

  res.json(users)
})

router.post("/", (req, res) => {
  const body = req.body
  res.status(201).json({
    message: "Posted",
    data: body,
  })
})

router.patch("/:id", (req, res) => {
  const { id } = req.params
  const body = req.body
  res.json({
    message: "Updated",
    data: body,
    id,
  })
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  res.json({
    message: "Deleted",
    id,
  })
})

module.exports = router
