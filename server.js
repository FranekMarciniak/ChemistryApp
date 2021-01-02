const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const db = mongoose.connection;
const app = express();
require("newrelic");

app.use(cors());
mongoose.connect(
  "mongodb+srv://admin:***REMOVED***@cluster0.vu14o.mongodb.net/database?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

db.once("open", function () {
  console.log("mongoose conected <3");
});

app.use(express.json({ extended: false }));

app.use("/api/blueprints", require("./routes/blueprints"));
app.use("/api/exercises", require("./routes/exercise"));
app.use("/api/test", require("./routes/test"));
app.use("/api/users", require("./routes/users"));

const PORT = process.env.port || 8001;
console.log(PORT);
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log("listening on port " + PORT));
