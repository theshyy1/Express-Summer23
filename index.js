const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 8000;

const moviesRoute = require("./routes/movies.route");
const castsRoute = require("./routes/casts.route");
const genresRoute = require("./routes/genres.route");
const uploadRoute = require("./routes/uploads.route");
const authRoute = require("./routes/auth.route");

const authMiddleware = require("./middleware/auth.middleware");

mongoose.connect("mongodb://127.0.0.1:27017/su23").then(() => console.log("Connected successfully"))

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send("Home page");
});

app.use("/movies", moviesRoute);
app.use("/casts", castsRoute);
app.use("/genres", genresRoute);
app.use("/auth", authRoute);
app.use("/uploads", uploadRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});