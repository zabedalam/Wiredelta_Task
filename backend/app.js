const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
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
