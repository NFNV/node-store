const express = require("express")
const faker = require("faker")

const router = express.Router()

router.get("/", (req, res) => {
  const products = []
  const { size } = req.query
  const limit = size || 10

  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    })
  }

  res.json(products)
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

router.get("/filter", (req, res) => res.send("im a filter"))

router.get("/:id", (req, res) => {
  const { id } = req.params
  res.json({
    id,
    name: "Product 2",
    price: 2000,
  })
})

module.exports = router
