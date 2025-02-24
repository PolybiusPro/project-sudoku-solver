"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");

module.exports = function (app) {
    let solver = new SudokuSolver();

    app.route("/api/check").post((req, res) => {
        if (!req.body.puzzle || !req.body.coordinate || !req.body.value) {
            return res.json({ error: "Required field(s) missing" });
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
