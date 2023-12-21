require("dotenv").config();
const express = require("express");
const app = express();
const routes = require("./config/routes");
const cors = require("cors");
const PORT = process.env.APP_PORT || 5000;
const swaggerUI = require("swagger-ui-express");
const apidocs = require("./apidocs.json");
const path = require("path");

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);
// Serve the TensorFlow.js model
app.use(
  "/tfjs_model",
  express.static(path.join(__dirname, "public/tfjs_model"))
);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apidocs));
app.use((req, res) => {
  res.statusCode = 404;
  res.send("Not Found");
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
