const mongoose = require("mongoose");
const dbConfig = require("../src/config/db.config.js");
const Genre = require("../src/models/genre.model.js");
const Movie = require("../src/models/movie.model.js");

describe('Database Tests', function() {
    before(function (done) {
        mongoose.connect(dbConfig.url);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
        console.log('We are connected to test database!');
        done();
    });
    after(function(done){
        mongoose.connection.db.dropDatabase(function(){
            mongoose.connection.close(done);
            });
        });
    });
});


describe('Test Genre', function() {
    it('New genre_data saved to test genre model', function(done) {
        const testGenre = Genre({
            name: 'genre-test-1',
            description: 'description for the genre-test-1'
        });

        testGenre.save(done);
    });
    it('Dont save incorrect format to database', function(done) {
        const wrongGenre = Genre({
            description: 'description for the genre-test'
        });
        wrongGenre.save(err => {
            if(err) { return done(); }
            throw new Error('Should generate error!');
        });
    });
    it('Should retrieve data from test database', function(done) {
        Genre.find({name: 'genre-test-1'}, (err, name) => {
            if(err) {throw err;}
            if(name.length === 0) {throw new Error('No data!');}
            done();
        });
    });
});

describe('Test Movie', function() {
    it('New movie_data saved to test movie model', function(done) {
        const testMovie = Movie({
            name: 'movie-test-1',
            description: 'description for the movie-test-1',
            release_date: '08/05/2020',
            genres: [
                "5f2979ba8983a92447435492", "5f2979bf8983a92447435493"
            ],
            duration: 255000,
            rating: 10
        });

        testMovie.save(done);
    });
    it('Dont save incorrect format to database', function(done) {
        const wrongMovie = Movie({
            description: 'description for the genre-test',
            release_date: 'released_date',
            genres: '12515',
            duration: '399090s',
            rating: '5star'
        });
        wrongMovie.save(err => {
            if(err) { return done(); }
            throw new Error('Should generate error!');
        });
    });
    it('Should retrieve data from test database', function(done) {
        Movie.find({name: 'movie-test-1'}, (err, name) => {
            if(err) {throw err;}
            if(name.length === 0) {throw new Error('No data!');}
            done();
        });
    });
});

