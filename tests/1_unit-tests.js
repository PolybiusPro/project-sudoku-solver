const chai = require("chai");
const assert = chai.assert;

const Solver = require("../controllers/sudoku-solver.js");
import { puzzlesAndSolutions } from "../controllers/puzzle-strings.js";
let solver = new Solver();

const validPuzzleString = puzzlesAndSolutions[0][0];
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
    test("Logic handles a valid row placement", (done) => {
        const result = solver.checkPlacement(
            validPuzzleString,
            "A2",
            "3"
        );
        assert.isTrue(result.valid);
        done();
    });
    test("Logic handles a invalid row placement", (done) => {
        const result = solver.checkPlacement(
            validPuzzleString,
            "A2",
            "4"
        );
        assert.isFalse(result.valid);
        assert.include(result.conflict, "row");
        done();
    });
    test("Logic handles a valid column placement", (done) => {
        const result = solver.checkPlacement(
            validPuzzleString,
            "b1",
            "9"
        );
        assert.isTrue(result.valid);
        done();
    });
    test("Logic handles a invalid column placement", (done) => {
        const result = solver.checkPlacement(
            validPuzzleString,
            "b1",
            "1"
        );
        assert.isFalse(result.valid);
        assert.include(result.conflict, "column");
        done();
    });
    test("Logic handles a valid region (3x3 grid) placement", (done) => {
        const result = solver.checkPlacement(
            validPuzzleString,
            "a2",
            "3"
        );
        assert.isTrue(result.valid);
        done();
    });
    test("Logic handles a invalid region (3x3 grid) placement", (done) => {
        const result = solver.checkPlacement(
            validPuzzleString,
            "b2",
            "5"
        );
        assert.isFalse(result.valid);
        assert.include(result.conflict, "region");
        done();
    });
});
