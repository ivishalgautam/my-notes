const express = require("express");
const app = new express();
const connectToMongo = require("./db");
const cors = require("cors");
// const bodyParser = require("body-parser");

connectToMongo();

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(8000, () => {
  console.log("listening on 8000");
});
