const jwt = require("jsonwebtoken")

const secret = "hehehe"
const payload = {
  sub: 1,
  role: "customer",
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret)
}

console.log(signToken(payload, secret))