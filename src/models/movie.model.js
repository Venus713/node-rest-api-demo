const Genre = require("./genre.model.js");
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    release_date: {
        type: Date
    },
    genres: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre',
            required: true
        }
    ],
    duration: {
        type: Number,
        default: 0
    },
    rating: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

MovieSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Movie', MovieSchema);
