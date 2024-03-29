const AppError = require("../../../tools/applicationError");
const pool = require("../../../services/db");
const adminCheck = require("../../../middleware/adminCheck");

const getAmountOfPartsAndID = `
    SELECT count(courses_have_parts.courses_parts_id) as "parts", id
    FROM courses
        LEFT JOIN courses_have_parts ON courses.id = courses_have_parts.courses_id
    WHERE url = ?
    GROUP BY id;`

const newCoursePartLink = `
    INSERT INTO courses_have_parts
    (courses_id, courses_parts_id)
    VALUES (?, ?);`

const newCoursePart = `
    INSERT INTO courses_parts
        (part, title, timestamp, video, length, description, url, text, courses_parts.exists, image)
        VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?);`

const error = "Cannot create new course part";

module.exports = app => {
    app.post("/api/admin/new-course-part", adminCheck, (req, res, next) => {
        if (req.body.courseURL == null ||
            req.body.url == null ||
            req.body.title == null ||
            req.body.text == null ||
            req.body.video == null ||
            req.body.exists == null ||
            req.body.length == null ||
            req.body.description == null) {
            res.send({ error: "No Body" });
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

                //insert new article
                connection.query(getAmountOfPartsAndID, [req.body.courseURL], (err, results) => {
                    if (err) {
                        return connection.rollback(function () {
                            connection.release();
                            next(new AppError(err));
                            return;
                        });
                    }

                    if(results.length > 0) {
                        const courseID = results[0].id;
                        const parts = results[0].parts;

                        connection.query(newCoursePart, [parts + 1, req.body.title, req.body.video, req.body.length, req.body.description, req.body.url, req.body.text, req.body.exists, req.body.image], (err, results) => {
                            if (err) {
                                return connection.rollback(function () {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                });
                            }

                            const partID = results.insertId;

                            connection.query(newCoursePartLink, [courseID, partID], (err, results) => {
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
                                });
                            });
                        });
                    }
                    else {
                        connection.commit((err) => {
                            if (err) {
                                return connection.rollback(function () {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                });
                            }

                            connection.release();
                            res.send({ error });
                        });
                    }
                    
                });
            })
        });
    })
}