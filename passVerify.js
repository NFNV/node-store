const bcrypt = require("bcrypt")

async function verifyPassword() {
  const myPassword = "admin"
  const hash = "$2b$10$vp8htYAJN4xDr1lHj62nyOXdPrh.afh1CQeWsQaytdUrGK0d1eRcC"
  const isMatch = await bcrypt.compare(myPassword, hash)
  console.log(isMatch)
}

verifyPassword()