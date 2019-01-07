const AppError = require("../../../tools/applicationError");
const pool = require("../../../services/db");
const adminCheck = require("../../../middleware/adminCheck");

const deleteCourse = `
    DELETE FROM
    courses
    WHERE id = ?;`

module.exports = app => {
    app.post("/api/admin/delete-course", adminCheck, (req, res, next) => {
        if (typeof req.body.id == null) {            
            res.send({ error: "No Course ID" });
            return;
        }

        pool.query(deleteCourse, [req.body.id], (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            res.end();
        })
    })
}