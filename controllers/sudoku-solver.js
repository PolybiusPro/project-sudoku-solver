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

    checkRowPlacement(puzzleString, row, value) {
        const board = createMatrix(puzzleString);
        const rowNum = rowMap[row];
        const currentRow = board[rowNum];
        if (currentRow.includes(value)) {
            return false;
        }
        return true;
    }

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

const rowMap = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
};

module.exports = SudokuSolver;
