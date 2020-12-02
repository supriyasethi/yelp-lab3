const assert = require("chai").assert;
const app = require("../index");
var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;
//chai.use(chaiHttp);
chai.should();

describe("App", () => {
	describe("GET /get/users", () => {
		it("should return a list of events when called", (done) => {
			chai
				.request(app)
				.get("/get/users")
				.query({ SearchKey: " ", PageNo : 5 })
				.end((err, res) => {
					res.should.have.status(200);
					done();
				});
		});
	});

	describe("POST /login/user", () => {
		it("should return status 200", async () => {
			chai
				.request(app)
				.post("/login/user")
				.send({ username: "jai.sethi@gmail.com", password: "12345@" })
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("POST /login/biz", () => {
		it("should return status 200", async () => {
			chai
				.request(app)
				.post("/login/biz")
				.send({ username: "ssupriya.sethi@gmail.com", password: "56789@" })
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("GET /get/messages", () => {
		it("should return status 200", async () => {
			chai
				.request(app)
				.get("/get/messages")
				.query({ restaurantId: "5f8c7a21005c5d34f0df9a93" })
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});

	describe("GET /get/messages", () => {
		it("should return status 200", async () => {
			chai
				.request(app)
				.get("/get/messages")
				.query({ userId: "5f8ca7f7aaffee33cc570dda" })
				.end((err, res) => {
					res.should.have.status(200);
				});
		});
	});
});
