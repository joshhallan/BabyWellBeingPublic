const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const child = require("./routes/api/child");
const feed = require("./routes/api/feeds");
const poop = require("./routes/api/poops");
const medication = require("./routes/api/medication");
const sleep = require("./routes/api/sleep");

const app = express(); // Bodyparser middleware

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(path.join(__dirname, "client", "build")));

app.use(bodyParser.json()); // DB Config

const db = require("./config/keys").mongoURI; // Connect to MongoDB

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/child", child);
app.use("/api/feeds", feed);
app.use("/api/poops", poop);
app.use("/api/medication", medication);
app.use("/api/sleep", sleep);

const port = process.env.PORT || 5000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
