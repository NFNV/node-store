const express = require("express")
const cors = require("cors")
const routerApi = require("./routes")
const app = express()
const port = 3000
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/errorHandler")

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => res.send("Hello, world!"))

routerApi(app)

app.use(logErrors)

app.use(boomErrorHandler)

app.use(errorHandler)

app.listen(port, () => console.log(`Server up, port ${port}`))
