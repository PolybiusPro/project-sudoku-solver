const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");
import { puzzlesAndSolutions } from "../controllers/puzzle-strings";

const validPuzzle = puzzlesAndSolutions[0][0];
const validSolution = puzzlesAndSolutions[0][1];
const invalidCharString = puzzlesAndSolutions[0][0].replace(".", "e");
const invalidLengthString = puzzlesAndSolutions[0][0].substring(1);
const invalidPuzzle = validPuzzle.replaceAll("5", "8");

chai.use(chaiHttp);

suite("Functional Tests", () => {
    test("Solve a puzzle with valid puzzle string: POST request to /api/solve", (done) => {
        chai.request(server)
            .post("/api/solve")
            .send({ puzzle: validPuzzle })
            .end((err, res) => {
                assert.strictEqual(res.body.solution, validSolution);
                done();
            });
    });
    test("Solve a puzzle with missing puzzle string: POST request to /api/solve", (done) => {
        chai.request(server)
            .post("/api/solve")
            .send({ puzzle: "" })
            .end((err, res) => {
                assert.strictEqual(
                    res.body.error,
                    "Required field missing"
                );
                done();
            });
    });
    test("Solve a puzzle with invalid characters: POST request to /api/solve", (done) => {
        chai.request(server)
            .post("/api/solve")
            .send({ puzzle: invalidCharString })
            .end((err, res) => {
                assert.strictEqual(
                    res.body.error,
                    "Invalid characters in puzzle"
                );
                done();
            });
    });
    test("Solve a puzzle with incorrect length: POST request to /api/solve", (done) => {
        chai.request(server)
            .post("/api/solve")
            .send({ puzzle: invalidLengthString })
            .end((err, res) => {
                assert.strictEqual(
                    res.body.error,
                    "Expected puzzle to be 81 characters long"
                );
                done();
            });
    });
    test("Solve a puzzle that cannot be solved: POST request to /api/solve", (done) => {
        chai.request(server)
            .post("/api/solve")
            .send({ puzzle: invalidPuzzle })
            .end((err, res) => {
                assert.strictEqual(
                    res.body.error,
                    "Puzzle cannot be solved"
                );
                done();
            });
    });
    test("Check a puzzle placement with all fields: POST request to /api/check", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({
                puzzle: validPuzzle,
                coordinate: "A2",
                value: "3",
            })
            .end((err, res) => {
                assert.isTrue(res.body.valid);
                done();
            });
    });
    test("Check a puzzle placement with single placement conflict: POST request to /api/check", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({
                puzzle: validPuzzle,
                coordinate: "A2",
                value: "7",
            })
            .end((err, res) => {
                assert.strictEqual(res.body.conflict.length, 1);
                done();
            });
    });
    test("Check a puzzle placement with multiple placement conflicts: POST request to /api/check", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({
                puzzle: validPuzzle,
                coordinate: "B2",
                value: "7",
            })
            .end((err, res) => {
                assert.strictEqual(res.body.conflict.length, 2);
                done();
            });
    });
    test("Check a puzzle placement with all placement conflicts: POST request to /api/check", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({
                puzzle: validPuzzle,
                coordinate: "h2",
                value: "6",
            })
            .end((err, res) => {
                assert.strictEqual(res.body.conflict.length, 3);
                done();
            });
    });
    test("Check a puzzle placement with missing required fields: POST request to /api/check", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({
                puzzle: validPuzzle,
                coordinate: "",
                value: "",
            })
            .end((err, res) => {
                assert.strictEqual(
                    res.body.error,
                    "Required field(s) missing"
                );
                done();
            });
    });
    test("Check a puzzle placement with invalid characters: POST request to /api/check", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({
                puzzle: invalidCharString,
                coordinate: "D9",
                value: "6",
            })
            .end((err, res) => {
                assert.strictEqual(
                    res.body.error,
                    "Invalid characters in puzzle"
                );
                done();
            });
    });
    test("Check a puzzle placement with incorrect length: POST request to /api/check", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({
                puzzle: invalidLengthString,
                coordinate: "D9",
                value: "6",
            })
            .end((err, res) => {
                assert.strictEqual(
                    res.body.error,
                    "Expected puzzle to be 81 characters long"
                );
                done();
            });
    });
    test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({
                puzzle: validPuzzle,
                coordinate: "D99",
                value: "6",
            })
            .end((err, res) => {
                assert.strictEqual(
                    res.body.error,
                    "Invalid coordinate"
                );
                done();
            });
    });
    test("Check a puzzle placement with invalid placement coordinate: POST request to /api/check", (done) => {
        chai.request(server)
            .post("/api/check")
            .send({
                puzzle: validPuzzle,
                coordinate: "D9",
                value: "66",
            })
            .end((err, res) => {
                assert.strictEqual(res.body.error, "Invalid value");
                done();
            });
    });
});
