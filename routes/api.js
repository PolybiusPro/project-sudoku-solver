"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
    let solver = new SudokuSolver();

    app.route("/api/check").post((req, res) => {
        const { puzzle, coordinate, value } = req.body;
        if (!puzzle || !coordinate || !value) {
            return res.json({ error: "Required field(s) missing" });
        }
        const COORD_REGEX = /^[a-i][1-9]$/i;
        const VAL_REGEX = /^[1-9]$/;
        if (!COORD_REGEX.test(coordinate)) {
            return res.json({ error: "Invalid coordinate" });
        }
        if (!VAL_REGEX.test(value)) {
            return res.json({ error: "Invalid value" });
        }
        const result = solver.checkPlacement(
            req.body.puzzle,
            req.body.coordinate,
            req.body.value
        );
        res.json(result);
    });

    app.route("/api/solve").post((req, res) => {
        if (!req.body.puzzle) {
            return res.json({ error: "Required field missing" });
        }
        res.json(solver.solve(req.body.puzzle));
    });
};
