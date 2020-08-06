const db = require("../models");
const Genre = db.genres;
const Movie = db.movies;

exports.create = (req, res) => {
    if (!req.body.name) {
        res.status(400).send({ message: "Content can't be empty! 'name' is required." });
        return;
    }

    const genre = new Genre(req.body);
    genre
    .save(genre)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Genre."
        });
    });
};

exports.findAll = (req, res) => {
    
    Genre.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while retrieving genres."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Genre.findById(id)
    .then(data => {
        if (!data)
            res.status(404).send({ message: `Not found Genre with id=${id}` });
        else res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: `Error retrieving Genre with id=${id}.` });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Genre.findByIdAndRemove(id)
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete Genre with id=${id}. Maybe Genre was not found!`
            });
        } else {
            return Movie.updateMany(
                {},
                {
                    $pull: { genres: { $in: [ id ] } }
                },
                { multi: true }
            );
        }
    })
    .then(movies => {
        res.send({
            message: `${id} Genre was deleted successfully!`
        });
    })
    .catch(err => {
        res.status(500).send({
            message: `Could not delete Genre with id=${id}.`
        });
    });
};

exports.deleteAll = (req, res) => {
    Genre.deleteMany({})
    .then(data => {
        return Movie.updateMany(
            {},
            {
                $set: { genres: [] }
            },
            { multi: true }
        );
    })
    .then(movies =>{
        res.send({
            message: 'All the genres were deleted successfully!'
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all tutorialss."
        });
    });
};
