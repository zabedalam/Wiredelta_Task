const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middlewares/errors");
const cors = require("cors");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(fileUpload());

//Import all routes
const jobProposals = require("./routes/proposals");
const auth = require("./routes/auth");
const product = require("./routes/product");
const order = require("./routes/order");

app.use("/api", jobProposals);
app.use("/api", auth);
app.use("/api", product);
app.use("/api", order);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
