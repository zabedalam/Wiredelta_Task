const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_SRV, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    .then(db => console.log("MongoDB Connected"))
    .catch(err => console.log(`DB Connection error: ${err.message}`));
};
module.exports = connectDatabase;
