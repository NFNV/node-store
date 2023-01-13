const express = require("express")
const OrderService = require("../services/orderService")
const validatorHandler = require("../middlewares/validatorHandler")
const passport = require("passport")
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require("../schemas/orderSchema")

const router = express.Router()

const service = new OrderService()

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const order = await service.find()
      res.json(order)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getOrderSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const order = await service.findOne(id)
      res.json(order)
    } catch (error) {
      next(error)
    }
  }
)

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createOrderSchema, "body"),
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

router.post(
  "/add-item",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(addItemSchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body
      const newItem = await service.addItem(body)
      res.status(201).json(newItem)
    } catch (error) {
      next(error)
    }
  }
)

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  //   validatorHandler(getUserSchema, "params"),
  //   validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const body = req.body
      const order = await service.update(id, body)
      res.json(order)
    } catch (error) {
      next(error)
    }
  }
)

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  //   validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params
      await service.delete(id)
      res.status(201).json({ id })
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
