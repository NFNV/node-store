const faker = require("faker")
const boom = require("@hapi/boom")
const getConnection = require("../libs/postgres")

class UsersService {
  constructor() {
    ;(this.users = []), this.generate()
  }

  generate() {
    const limit = 100

    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastName: faker.name.lastName(),
        job: faker.name.jobArea(),
      })
    }
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    }
    this.users.push(newUser)
    return newUser
  }

  async find() {
    const client = await getConnection()
    const rta = await client.query('SELECT * FROM tasks')
    return rta.rows
    // return this.users
  }

  async findOne(id) {
    const user = this.users.find((item) => item.id === id)
    if (!user) throw boom.notFound("Not found")
    if (user.isBlock) throw boom.conflict("User blocked")
    return user
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id)
    if (index === -1) throw boom.notFound("Not found")
    const user = this.users[index]
    this.users[index] = {
      ...user,
      ...changes,
    }
    return this.users[index]
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id)
    if (index === -1) throw boom.notFound("Not found")
    this.users.splice(index, 1)
    return { id }
  }
}

module.exports = UsersService
