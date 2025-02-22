const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
import { puzzlesAndSolutions } from "../controllers/puzzle-strings.js";
let solver = new Solver();

const invalidCharString = puzzlesAndSolutions[0][0].replace(".", "e");
const invalidLengthString = puzzlesAndSolutions[0][0].substring(1);

suite("Unit Tests", () => {
    test("Logic handles a valid puzzle string of 81 characters", (done) => {
        puzzlesAndSolutions.forEach((puzzle) => {
            assert.isTrue(solver.validate(puzzle[0]).valid);
            assert.isTrue(solver.validate(puzzle[1]).valid);
        });
        done();
    });
    test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", (done) => {
        assert.strictEqual(
            solver.validate(invalidCharString).error,
            "Invalid characters in puzzle"
        );
        done();
    });
    test("Logic handles a puzzle string that is not 81 characters in length", (done) => {
        assert.strictEqual(
            solver.validate(invalidLengthString).error,
            "Expected puzzle to be 81 characters long"
        );
        done();
    });
});
