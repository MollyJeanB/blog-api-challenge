const chai = require("chai");
const chaiHttp = require("chai-http");

const { app, runServer, closeServer } = require("../server");

const expect = chai.expect;

chai.use(chaiHttp);

describe("Blog Posts", function() {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it("should list posts on GET", function() {
    return chai
      .request(app)
      .get("/blog-posts")
      .then(function(res) {
        expect(res).to.be.json;
        expect(res.body).to.be.a("array");
        const expectedKeys = [
          "id",
          "title",
          "content",
          "author",
          "publishDate"
        ];
        res.body.forEach(function(item) {
          expect(item).to.be.a("object");
          expect(item).to.include.keys(expectedKeys);
        });
      });
  });
  it("should add post on POST", function() {
    const newPost = {
      title: "The Tree With the Lights In It",
      content: `Then one day I was walking along Tinker creek and thinking of nothing at all and I saw the tree with the lights in it.`,
      author: "Annie Dillard"
    };
    return chai
      .request(app)
      .post("/blog-posts")
      .send(newPost)
      .then(function(res) {
        expect(res).to.have.status(201);
        expect(res).to.be.json;
        expect(res.body).to.be.a("object");
        expect(res.body).to.include.keys(
          "id",
          "title",
          "content",
          "author",
          "publishDate"
        );
        expect(res.body.id).to.not.equal(null);
        // expect(res.body).to.deep.equal(
        //   Object.assign(newPost, { id: res.body.id })
        // );
      });
  });
  it("should update posts on PUT", function() {
    const updateData = {
      title: "Ode to Tampon",
      content: `you who blossomed into the air like steam from a whale's blowhole`,
      author: "Sharon Olds",
      //how to properly handle publishDate??
      publishDate: 1516731004245
    };
    return chai
      .request(app)
      .get("/blog-posts")
      .then(function(res) {
        updateData.id = res.body[0].id;
        return chai
          .request(app)
          .put(`/blog-posts/${updateData.id}`)
          .send(updateData);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
        //how to fix errors with regards to 'expected headers to have application json' and discrepancy with id field of response object???

        // expect(res).to.be.json;
        // expect(res.body).to.be.a("object");
        // expect(res.body).to.deep.equal(updateData);
      });
  });
  it("should delete post on DELETE", function() {
    return chai
      .request(app)
      .get("/blog-posts")
      .then(function(res) {
        return chai.request(app).delete(`/blog-posts/${res.body[0].id}`);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
      });
  });
});
