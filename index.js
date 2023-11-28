require("dotenv").config()
const express = require("express")
const app = express()
const routes = require("./config/routes")
const bodyParser = require("body-parser")
const cors = require('cors');
const PORT = process.env.APP_PORT || 5000

app.use(bodyParser.json())
app.use(cors());
routes(app)

app.use(express.json())
app.use(routes)

app.use((req, res) => {
    res.statusCode = 404
    res.send("Not Found")
})

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))