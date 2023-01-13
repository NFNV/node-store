const boom = require("@hapi/boom")

const { models } = require("../libs/sequelize")

class OrderService {
  constructor() {}

  async create(data) {
    const newOrder = await models.Order.create(data)
    return newOrder
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data)
    return newItem
  }

  async find() {
    const order = await models.Order.findAll()
    return order
  }

  async findByUser(userId) {
    const order = await models.Order.findAll({
      where: {"$customer.user.id$": userId},
      include: [{ association: "customer", include: ["user"] }],
    })
    return order
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{ association: "customer", include: ["user"] }, "items"],
    })
    return order
  }

  async update(id, changes) {
    const order = await this.findOne(id)
    const rta = await order.update(changes)
    return rta
  }

  async delete(id) {
    const order = await this.findOne(id)
    order.destroy()
    return { id }
  }
}

module.exports = OrderService
