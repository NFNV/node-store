const jwt = require("jsonwebtoken")

const secret = "hehehe"
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY3MzAzOTk5N30.HR_iOnostI-S9V98ENXbfz4lMjE1QGmUGew5mDiyahY"

function verifyToken(token, secret) {
  return jwt.verify(token, secret)
}

console.log(verifyToken(token, secret))
