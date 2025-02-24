const { resolvePlugin } = require("@babel/core");

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
        return true;
    }

    checkRowPlacement(board, row, col, value) {
        const currentRow = board[row];
        if (board[row][col] === value) return true;
        if (currentRow.includes(value)) {
            return false;
        }
        return true;
    }

    checkColPlacement(board, row, col, value) {
        for (let i = 0; i < board.length; i++) {
            if (board[i][col] === value) {
                if (board[row][col] === value) return true;
                return false;
            }
        }
        return true;
    }

    checkRegionPlacement(board, row, col, value) {
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (board[i][j] === value) {
                    if (board[row][col] === value) return true;
                    return false;
                }
            }
        }
        return true;
    }

    checkPlacement(puzzleString, coord, value) {
        let badPlacement = {
            valid: false,
            conflict: [],
        };

        const isValid = this.validate(puzzleString);
        if (isValid.error) {
            return isValid;
        }

        const [row, col] = coord.split("");
        const rowNum = rowMap[row.toUpperCase()];
        const colNum = +col - 1;
        const board = this.createMatrix(puzzleString);
        const args = [board, rowNum, colNum, value];

        if (!this.checkRowPlacement(...args)) {
            badPlacement.conflict.push("row");
        }
        if (!this.checkColPlacement(...args)) {
            badPlacement.conflict.push("column");
        }
        if (!this.checkRegionPlacement(...args)) {
            badPlacement.conflict.push("region");
        }
        if (badPlacement.conflict.length !== 0) {
            return badPlacement;
        }
        return { valid: true };
    }

    solve(puzzleString) {
        const possibleNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        const isValid = this.validate(puzzleString);
        if (isValid.error) {
            return isValid;
        }
        const board = this.createMatrix(puzzleString);
        const EMPTY = ".";
        const emptyCoords = [];

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === EMPTY) {
                    emptyCoords.push({ row: i, col: j });
                }
            }
        }

        const bruteForce = (emptyIndex) => {
            if (emptyIndex >= emptyCoords.length) {
                return true;
            }

            const { row, col } = emptyCoords[emptyIndex];

            for (let i = 0; i < possibleNums.length; i++) {
                let num = possibleNums[i];
                if (
                    this.checkRowPlacement(board, row, col, num) &&
                    this.checkColPlacement(board, row, col, num) &&
                    this.checkRegionPlacement(board, row, col, num)
                ) {
                    board[row][col] = num;
                    if (bruteForce(emptyIndex + 1)) {
                        return true;
                    }
                    board[row][col] = EMPTY;
                }
            }
            return false;
        };
        bruteForce(0);
        const result = board.flat().join("");
        if (result.includes(".")) {
            return { error: "Puzzle cannot be solved" };
        } else {
            return { solution: result };
        }
    }

    createMatrix(puzzleString) {
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
    }
}

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
