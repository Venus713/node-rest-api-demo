require('dotenv').config();
const { HOST, PORT, CORS_ORIGIN } = process.env;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: CORS_ORIGIN || "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => {
    console.log("[mongodb] connection has been established!");
})
.catch(err => {
    console.log("[mongodb] connection error!", err.message);
    process.exit();
});


app.get("/", (req, res) => {
    res.json({ message: "Welcome to node-demo-api application!" });
});

require("./routes/genre.routes")(app);
require("./routes/movie.routes")(app);

const port = PORT || 8080;
const host = HOST || "localhost";

app.listen(PORT || 8000, () => {
    console.log(`🚀 Server is running at http://${host}:${port}`);
});

module.exports = app;
