const express = require("express")
const UsersService = require("../services/userService")
const router = express.Router()

const service = new UsersService()

router.get("/", (req, res) => {
  const users = service.find()

  res.json(users)
})

router.get("/:id", (req, res) => {
  const { id } = req.params

  const user = service.findOne(id)

  res.json(user)
})

router.post("/", (req, res) => {
  const body = req.body

  const user = service.create(body)

  res.status(201).json(user)
})

router.patch("/:id", (req, res) => {
  const { id } = req.params
  const body = req.body
  const user = service.update(id, body)
  res.json(user)
})

router.delete("/:id", (req, res) => {
  const { id } = req.params
  const user = service.delete(id)
  res.json(user)
})

router.get("/filter", (req, res) => res.send("im a filter"))

module.exports = router