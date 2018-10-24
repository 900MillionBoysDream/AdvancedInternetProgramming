//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
const UserMovieRating = require("../models/UserMovieRating");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe("UserMovieRatings API Tests", () => {
  beforeEach(done => {
    //Before each test we empty the database
    UserMovieRating.deleteMany({}, err => {
      done();
    });
  });

  // @test    api/usermovieratings
  // @desc    Test all usermovierating APIs of a certain user
  // @access  Private
  describe("PRIVATE api tests", function() {
    // Get the ratings of a user before login
    it("should not get usermovieratings before login", function(done) {
      chai
        .request(server)
        .get("/api/usermovieratings")
        .end((err, res) => {
          res.should.have.status(401); //Unauthorized
          done();
        });
    });

    var token = null;
    // Obtain the token
    before(function(done) {
      chai
        .request(server)
        .post("/api/users/login")
        .send({ email: "wt2003031@gmail.com", password: "bunny111" })
        .end(function(err, res) {
          token = res.body.token;
          done();
        });
    });
    // Get the ratings of a user
    it("should get usermovieratings for user: wt2003031@gmail.com", function(done) {
      chai
        .request(server)
        .get("/api/usermovieratings")
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
    // Post a rating for a movie of a user
    it("should post usermovieratings for user: wt2003031@gmail.com", function(done) {
      chai
        .request(server)
        .post("/api/usermovieratings")
        .set("Authorization", token)
        .send({ movieID: "5bafbdddebb8030b5cc5046e", rating: 4 })
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body);
          res.body.should.be.a("object");
          res.body.should.have.property("rating").eql(4);
          done();
        });
    });
    //Delete a rating for a movie of a user
    it("should delete a usermovierating for user: wt2003031@gmail.com", function(done) {
      chai
        .request(server)
        .delete("/api/usermovieratings/5bafbdddebb8030b5cc5046e")
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          should.exist(res.body);
          res.body.should.be.a("object");
          res.body.should.have.property("success").eql(true);
          done();
        });
    });
    // Post an invalid rating for a movie of a user
    it("should not post an invalid rating number for user: wt2003031@gmail.com", function(done) {
      chai
        .request(server)
        .post("/api/usermovieratings")
        .set("Authorization", token)
        .send({ movieID: "5bafbdddebb8030b5cc5046e", rating: 11 })
        .end((err, res) => {
          res.should.have.status(400);
          should.exist(res.body);
          res.body.should.be.a("object");
          res.body.should.have
            .property("rating")
            .eql("Rating must be between 0 and 10");
          done();
        });
    });
    it("should not post an invalid rating type for user: wt2003031@gmail.com", function(done) {
      chai
        .request(server)
        .post("/api/usermovieratings")
        .set("Authorization", token)
        .send({ movieID: "5bafbdddebb8030b5cc5046e", rating: "test" })
        .end((err, res) => {
          res.should.have.status(400);
          should.exist(res.body);
          res.body.should.be.a("object");
          res.body.should.have
            .property("rating")
            .eql("Rating must be a decimal number");
          done();
        });
    });
    it("should not post without movie or rating for user: wt2003031@gmail.com", function(done) {
      chai
        .request(server)
        .post("/api/usermovieratings")
        .set("Authorization", token)
        .send({ movieID: "", rating: "" })
        .end((err, res) => {
          res.should.have.status(400);
          should.exist(res.body);
          res.body.should.be.a("object");
          res.body.should.have.property("movie").eql("Movie ID is required");
          res.body.should.have
            .property("rating")
            .eql("Please rate this movie before submitting");
          done();
        });
    });
  });
});
