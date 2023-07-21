const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;

const moviesRoute = require("./routes/movies.route");
const castsRoute = require("./routes/casts.route");
const genresRoute = require("./routes/genres.route");
const uploadRoute = require("./routes/uploads.route");

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send("Home page");
});

app.use("/movies", moviesRoute);
app.use("/casts", castsRoute);
app.use("/genres", genresRoute);
app.use("/uploads", uploadRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});