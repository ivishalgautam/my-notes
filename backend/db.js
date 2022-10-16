const mongoose = require("mongoose");
const uri =
  "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
  mongoose.connect(uri, () => {
    console.log("Connected to mongo");
  });
};

module.exports = connectToMongo;
