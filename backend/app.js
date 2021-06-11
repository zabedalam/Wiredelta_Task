const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors");

app.use(express.json());
app.use(cookieParser());
//Import all routes
const jobProposals = require("./routes/proposals");
const auth = require("./routes/auth");

app.use("/api", jobProposals);
app.use("/api", auth);

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;
