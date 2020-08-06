const db = require("../models");
const Movie = db.movies;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "name field can't be empty! 'name' is required." });
        return;
    }

    if (!req.body.genres || req.body.genres.length===0) {
        res.status(400).send({ message: "genres field can't be empty! 'genres' is required." });
        return;
    }

    const movie = new Movie(req.body);

    movie
    .save(movie)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Movie."
        });
    });
};

exports.findAll = (req, res) => {
    
    Movie.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Movies."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Movie.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({
                message: `Not found the movie with id=${id}.`
            });
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({
            message: `Error retrieving movie with id=${id}.`
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Movie.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Can't delete the movie with id=${id}. Maybe the movie was not found!`
            });
        } else {
            res.send({
                message: `id=${id} movie was deleted successfully!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Couldn't delete Movie with id=${id}.`
        });
    });
};

exports.deleteAll = (req, res) => {
    Movie.deleteMany({})
    .then(data => {
        res.send({
            message: `All the Movies were deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all tutorials."
        });
    });
};
