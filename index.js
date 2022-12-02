const express = require("express")
const routerApi = require("./routes")
const app = express()
const port = 3000

app.use(express.json())

app.get("/", (req, res) => res.send("Hello, world!"))

routerApi(app)

// app.get("/1", (req, res) => res.send("Hello, im route 2!"))

// app.get("/users", (req, res) => {
//   const { limit, offset } = req.query

//   if (limit && offset) res.json({ limit, offset })
//   else res.send("No params")
// })

// app.get("/category/:categoryId/products/:productId", (req, res) => {
//   const { categoryId, productId } = req.params
//   res.json({
//     categoryId,
//     productId,
//   })
// })

app.listen(port, () => console.log(`Server up, port ${port}`))
