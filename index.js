const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;

const moviesRoute = require("./routes/movies.route");
const castsRoute = require("./routes/casts.route");
const genresRoute = require("./routes/genres.route");
const uploadRoute = require("./routes/uploads.route");
const authRoute = require("./routes/auth.route");

const authMiddleware = require("./middleware/auth.middleware");

mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected to MongoDBLocal successfully"))

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