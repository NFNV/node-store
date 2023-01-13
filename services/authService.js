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

  async sendRecovery(email) {
    const user = await service.findByEmail(email)
    if (!user) throw boom.unauthorized()
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "15min" })
    const link = `https://myfrontend.com/recovery?token=${token}`
    await service.update(user.id, { recoveryToken: token })
    const mail = {
      from: "The backend 👻",
      to: `${user.email}`,
      subject: "Recovery password",
      html: `<b>Hello! Here is your recovery link: ${link}</b>`,
    }
    const rta = await this.sendMail(mail)
    return rta
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: false,
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    })

    await transporter.sendMail(infoMail)
    return { message: "mail sent" }
  }
}

module.exports = authService
