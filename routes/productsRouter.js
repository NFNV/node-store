const express = require("express")
const ProductsService = require("../services/productService")
const validatorHandler = require("../middlewares/validatorHandler")
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require("../schemas/productSchema")

const router = express.Router()

const service = new ProductsService()

router.get(
  "/",
  validatorHandler(queryProductSchema, "query"),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query)
      res.json(products)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const product = await service.findOne(id)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body

      const product = await service.create(body)

      res.status(201).json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const product = await service.update(id, body)
      res.json(product)
    } catch (error) {
      next(error)
    }
  }
)

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  const product = await service.delete(id)
  res.json(product)
})

module.exports = router
