const express = require("express")
const ProductsService = require("../services/productService")
const router = express.Router()

const service = new ProductsService()

router.get("/", async (req, res) => {
  const products = await service.find()

  res.json(products)
})

router.get("/:id", async (req, res) => {
  const { id } = req.params

  const product = await service.findOne(id)

  res.json(product)
})

router.post("/", async (req, res) => {
  try {
    const body = req.body

    const product = await service.create(body)

    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const body = req.body
    const product = await service.update(id, body)
    res.json(product)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  const product = await service.delete(id)
  res.json(product)
})

module.exports = router