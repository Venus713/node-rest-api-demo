module.exports = app => {
    const genres = require("../controllers/genre.controller.js");
    var router = require("express").Router();

    router.post("/", genres.create);
    router.get("/", genres.findAll);
    router.get("/:id", genres.findOne);
    router.delete("/:id", genres.delete);
    router.delete("/", genres.deleteAll);

    app.use('/api/genres', router);
};
