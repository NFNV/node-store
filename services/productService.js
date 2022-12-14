const faker = require("faker")
const boom = require("@hapi/boom")
// const pool = require("../libs/postgresPool")
const sequelize = require("../libs/sequelize")

class ProductsService {
  constructor() {
    ;(this.products = []), this.generate()
  }

  generate() {
    const limit = 100

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    }
    this.products.push(newProduct)
    return newProduct
  }

  async find() {
    const query = "SELECT * FROM tasks"
    const [data] = await sequelize.query(query)
    return data

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.products)
    //   }, 1000)
    // })
  }

  async findOne(id) {
    const product = this.products.find((item) => item.id === id)
    if (!product) throw boom.notFound("Not found")
    if (product.isBlock) throw boom.conflict("Product blocked")
    return product
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id)
    if (index === -1) throw boom.notFound("Not found")
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes,
    }
    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id)
    if (index === -1) throw boom.notFound("Not found")
    this.products.splice(index, 1)
    return { id }
  }
}

module.exports = ProductsService
