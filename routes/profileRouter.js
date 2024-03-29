const express = require("express")
const passport = require("passport")
const OrderService = require("../services/orderService")

const router = express.Router()

const service = new OrderService()

router.get(
  "/my-orders",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
        const user = req.user
        const order = await service.findByUser(user.sub)
        res.json(order)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
