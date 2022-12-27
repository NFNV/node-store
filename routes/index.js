const express = require("express")

const productsRouter = require("./productsRouter")
const categoriesRouter = require("./categoriesRouter")
const usersRouter = require("./usersRouter")
// const orderRouter = require("./ordersRouter")
const customersRouter = require("./customerRouter")

function routerApi(app) {
  const router = express.Router()
  app.use("/api/v1", router)
  router.use("/products", productsRouter)
  router.use("/categories", categoriesRouter)
  router.use("/users", usersRouter)
  // router.use("/orders", orderRouter)
  router.use("/customers", customersRouter)
}

module.exports = routerApi
