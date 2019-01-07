const AppError = require("../../../tools/applicationError");
const pool = require("../../../services/db");
const adminCheck = require("../../../middleware/adminCheck");

const deleteCoursesPartLinkToCourse = `
    DELETE FROM
    courses_have_parts
    WHERE courses_parts_id = ?;`

const deleteCoursePart = `
    DELETE FROM
    courses_parts
    WHERE id = ?;`

module.exports = app => {
    app.post("/api/admin/delete-course-part", adminCheck, (req, res, next) => {
        if(typeof req.body.id == null) {
            res.send({ error: "No ID" });
            return;
        }

        pool.getConnection((err, connection) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    next(new AppError(err));
                    return;
                }

                connection.query(deleteCoursesPartLinkToCourse, [req.body.id], (err, results) => {
                    if (err) {
                        return connection.rollback(function () {
                            connection.release();
                            next(new AppError(err));
                            return;
                        });
                    }

                    //delete all the articles tags so we can add new ones
                    connection.query(deleteCoursePart, [req.body.id], (err, results) => {
                        if (err) {
                            return connection.rollback(function () {
                                connection.release();
                                next(new AppError(err));
                                return;
                            });
                        }                        

                        connection.commit((err) => {
                            if (err) {
                                return connection.rollback(function () {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                });
                            }

                            connection.release();
                            res.end();
                        })                        
                    });
                });
            })
        });
    })
}