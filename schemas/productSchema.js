const Joi = require("joi")

const id = Joi.string().uuid()
const name = Joi.string().alphanum().min(3).max(15)
const price = Joi.number().integer().min(10)

const createProductSchema = Joi.object({
  name: name.require(),
  price: price.require(),
})

const updateProductSchema = Joi.object({
  name: name,
  price: price,
})

const getProductSchema = Joi.object({
  id: id.require(),
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema }
