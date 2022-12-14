const express = require("express")
// const cors = require("cors")
const routerApi = require("./routes")
const { checkApiKey } = require("./middlewares/authHandler")
const app = express()
const port = 3000
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/errorHandler")

app.use(express.json())

require("./utils/auth")

app.get("/", checkApiKey, (req, res) => res.send("Hello, world!"))

routerApi(app)

app.use(logErrors)

app.use(ormErrorHandler)

app.use(boomErrorHandler)

app.use(errorHandler)

app.listen(port, () => console.log(`Server up, port ${port}`))
