require("dotenv").config()
const express = require("express")
const app = express()
const routes = require("./config/routes")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 8080

app.use(bodyParser.urlencoded({extended: false}))

routes(app)

app.use((req, res) => {
    res.statusCode = 404
    res.send("Not Found")
})

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))