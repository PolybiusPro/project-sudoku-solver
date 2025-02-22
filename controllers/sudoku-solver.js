class SudokuSolver {
    validate(puzzleString) {
        const PUZZLE_REGEX = /^[1-9\.]+$/g;

        if (puzzleString.length !== 81) {
            return {
                error: "Expected puzzle to be 81 characters long",
            };
        }

        if (!PUZZLE_REGEX.test(puzzleString)) {
            return { error: "Invalid characters in puzzle" };
        }

        return { valid: true };
    }

    checkRowPlacement(puzzleString, row, column, value) {}

    checkColPlacement(puzzleString, row, column, value) {}

    checkRegionPlacement(puzzleString, row, column, value) {}

    solve(puzzleString) {}
}

const createMatrix = (puzzleString) => {
    let matrix = [];
    let row = [];
    for (let i = 0; i <= puzzleString.length - 1; i++) {
        row.push(puzzleString[i]);
        if (row.length === 9) {
            matrix.push(row);
            row = [];
        }
    }
    return matrix;
};

module.exports = SudokuSolver;
