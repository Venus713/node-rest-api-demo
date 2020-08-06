const app = require("../src/server");
const chai = require("chai");
const chaiHttp = require("chai-http");
const Genre = require("../src/models/genre.model.js");
const Movie = require("../src/models/movie.model.js");

const { expect } = chai;
chai.use(chaiHttp);

describe("Server!", () => {
    it("welcome to the api", done => {
        chai
        .request(app)
        .get("/")
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.message).to.eql("Welcome to node-demo-api application!");
            done();
        });
    });
});

describe('Genre API Routes', () => {

    beforeEach((done) => { //Before each test we empty the database
        Genre.deleteMany({}, (err) => { 
           done();           
        });        
    });

    describe('POST /genres', () => {
        it('it should POST a genre', done => {
            chai
            .request(app)
            .post('/api/genres')
            .send({
                name: 'test-genre-1',
                description: 'description for test-genre-1'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.name).to.eql("test-genre-1");
                expect(res.body.description).to.eql("description for test-genre-1");
                done();
            });
        });

        it('it should not POST a genre without name field', done => {
            chai
            .request(app)
            .post('/api/genres')
            .send({
                description: 'description for test-genre'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.eql("Content can't be empty! 'name' is required.");
                done();
            });
        });
    });

    describe('GET /genres', () => {
        it('it should GET all the genres', (done) => {
            chai.request(app)
            .get('/api/genres')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.eql(0);
                done();
            });
        });
    });

    describe('GET /genres/:id', function() {
        it('it should GET a genre by the given id', function(done) {
            const genre = new Genre({
                name: "genre-test",
                description: "description for the genre-test"
            });
            genre.save((err, genre) => {
                chai
                .request(app)
                .get('/api/genres/' + genre._id)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.eql(genre.name);
                    expect(res.body.description).to.eql(genre.description);
                    done();
                });
            });
        });

        it('it should not GET a genre by the given invalid id', function(done) {
            const id = '5f39db040b95a230075ef35c'
            chai
            .request(app)
            .get('/api/genres/' + id)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                expect(res.body.message).to.eql(`Not found Genre with id=${id}`)
                done();
            });
        });
    });

    describe('DELETE /genres/:id', () => {
        it('it should DELETE a genre given the id', (done) => {
            const genre = new Genre({
                name: "genre-test",
                description: "description for the genre-test"
            })
            genre.save((err, genre) => {
                  chai
                  .request(app)
                  .delete('/api/genres/' + genre._id)
                  .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body.message).to.eql(`${genre._id} Genre was deleted successfully!`);
                    done();
                  });
            });
        });

        it('it should not DELETE a genre given the invalid id', (done) => {
            const id = '5f39db040b95a230075ef35c'
            chai
            .request(app)
            .delete('/api/genres/' + id)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.a('object');
                expect(res.body.message).to.eql(`Cannot delete Genre with id=${id}. Maybe Genre was not found!`);
            done();
            });
        });
    });

    describe('DELETE /genres', () => {
        it('it should DELETE all the genres', (done) => {
            chai
            .request(app)
            .delete('/api/genres')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.message).to.eql('All the genres were deleted successfully!');
            done();
            });
        });
    });
});


describe('Movie API Routes', () => {

    beforeEach((done) => { //Before each test we empty the database
        Movie.deleteMany({}, (err) => { 
           done();           
        });        
    });

    describe('POST /movies', () => {
        it('it should POST a movie', done => {
            chai
            .request(app)
            .post('/api/movies')
            .send({
                name: 'test-movie-1',
                description: 'description for test-movie-1',
                release_date: '08/04/2020',
                genres: [ '5f29db040b95a230075ef35a', '5f29db41773c2e30c0f641b0' ],
                duration: 35000,
                rating: 10
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.name).to.eql('test-movie-1');
                expect(res.body.description).to.eql('description for test-movie-1');
                expect(res.body.genres).to.eql([ '5f29db040b95a230075ef35a', '5f29db41773c2e30c0f641b0' ]);
                expect(res.body.duration).to.eql(35000);
                expect(res.body.rating).to.eql(10);
                done();
            });
        });

        it('it should not POST a movie without name field', done => {
            chai
            .request(app)
            .post('/api/movies')
            .send({
                description: 'description for test-movie',
                release_date: '08/04/2020',
                genres: [ '5f29db040b95a230075ef35a', '5f29db41773c2e30c0f641b0' ],
                duration: 35000,
                rating: 10
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.eql("name field can't be empty! 'name' is required.");
                done();
            });
        });

        it('it should not POST a movie without genres', done => {
            chai
            .request(app)
            .post('/api/movies')
            .send({
                name: 'test-movie',
                description: 'description for test-movie',
                release_date: '08/04/2020',
                genres: [],
                duration: 35000,
                rating: 10
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.message).to.eql("genres field can't be empty! 'genres' is required.");
                done();
            });
        });
    });

    describe('GET /movies', () => {
        it('it should GET all the movies', (done) => {
            chai
            .request(app)
            .get('/api/movies')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array');
                expect(res.body.length).to.eql(0);
                done();
            });
        });
    });

    describe('GET /movies/:id', function() {
        it('it should GET a movie by the given id', function(done) {
            const movie = new Movie({
                name: 'test-movie',
                description: 'description for test-movie',
                release_date: '08/04/2020',
                genres: [ '5f29db040b95a230075ef35a', '5f29db41773c2e30c0f641b0' ],
                duration: 35000,
                rating: 10
            });
            movie.save((err, movie) => {
                chai
                .request(app)
                .get('/api/movies/' + movie._id)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body.name).to.eql(movie.name);
                    expect(res.body.description).to.eql(movie.description);
                    expect(res.body.genres).to.be.a('array');
                    expect(res.body.duration).to.eql(movie.duration);
                    expect(res.body.rating).to.eql(movie.rating);
                    done();
                });
            });
        });

        it('it should not GET a movie by the given invalid id', function(done) {
            const id = '5f39db040b95a230075ef35c'
            chai
            .request(app)
            .get('/api/movies/' + id)
            .end(function(err, res) {
                expect(res).to.have.status(404);
                expect(res.body.message).to.eql(`Not found the movie with id=${id}.`);
                done();
            });
        });
    });

    describe('DELETE /movies/:id', () => {
        it('it should DELETE a movie given the id', (done) => {
            const movie = new Movie({
                name: 'test-movie',
                description: 'description for test-movie',
                release_date: '08/04/2020',
                genres: [ '5f29db040b95a230075ef35a', '5f29db41773c2e30c0f641b0' ],
                duration: 35000,
                rating: 10
            })
            movie.save((err, movie) => {
                  chai
                  .request(app)
                  .delete('/api/movies/' + movie._id)
                  .end((err, res) => {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('object');
                        expect(res.body.message).to.eql(`id=${movie._id} movie was deleted successfully!`);
                    done();
                  });
            });
        });

        it('it should not DELETE a genre given the invalid id', (done) => {
            const id = '5f39db040b95a230075ef35c'
            chai
            .request(app)
            .delete('/api/movies/' + id)
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.a('object');
                expect(res.body.message).to.eql(`Can't delete the movie with id=${id}. Maybe the movie was not found!`);
            done();
            });
        });
    });

    describe('DELETE /movies', () => {
        it('it should DELETE all the movies', (done) => {
            chai
            .request(app)
            .delete('/api/movies')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.message).to.eql(`All the Movies were deleted successfully!`);
            done();
            });
        });
    });
});
