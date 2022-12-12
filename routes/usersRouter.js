const express = require("express")
const UsersService = require("../services/userService")
const router = express.Router()

const service = new UsersService()

router.get("/", async (req, res) => {
  try {
    const users = await service.find()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params

    const user = await service.findOne(id)

    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const body = req.body

    const user = await service.create(body)

    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
})

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body
    const user = await service.update(id, body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  const user = await service.delete(id)
  res.json(user)
})

router.get("/filter", (req, res) => res.send("im a filter"))

module.exports = router
