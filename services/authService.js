const UsersService = require("./userService")
const boom = require("@hapi/boom")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { config } = require("../config/config")
const nodemailer = require("nodemailer")

const service = new UsersService()

class authService {
  async getUsers(email, password) {
    const user = await service.findByEmail(email)
    if (!user) throw boom.unauthorized()
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw boom.unauthorized()
    delete user.dataValues.password
    return user
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    }
    const token = jwt.sign(payload, config.jwtSecret)
    return {
      user,
      token,
    }
  }

  async sendMail(email) {
    const user = await service.findByEmail(email)
    if (!user) throw boom.unauthorized()
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "gideon.hegmann25@ethereal.email",
        pass: "AqwhG2NXXrECAFstWD",
      },
    })

    await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello fucking world!", // plain text body
      html: "<b>Hello world?</b>", // html body
    })
    return { message: "mail sent" }
  }
}

module.exports = authService
