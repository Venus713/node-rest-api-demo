module.exports = app => {
    const movies = require("../controllers/movie.controller.js");
    var router = require("express").Router();

    router.post("/", movies.create);
    router.get("/", movies.findAll);
    router.get("/:id", movies.findOne);
    router.delete("/:id", movies.delete);
    router.delete("/", movies.deleteAll);

    app.use('/api/movies', router);
};
