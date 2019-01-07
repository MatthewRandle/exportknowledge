const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");

const getCourse = `
    SELECT  courses.id, 
            courses.url, courses.title, 
            courses.preview_description as preview, 
            courses.description, 
            courses.image, 
            courses.video, 
            courses.exists, 
            categories.category, 
            categories.id as "categoryID", 
            courses.what_learn as "whatLearn", 
            courses.who_for as "whoFor",
            courses.prerequisites
    FROM courses
        LEFT JOIN categories ON courses.categories_id = categories.id
    WHERE courses.url = ?
    LIMIT 1;`;

const getCoursesParts = `
    SELECT part, title, timestamp, video, length, url, description, text
    FROM courses_parts
        JOIN courses_have_parts ON courses_parts_id = courses_parts.id
    WHERE courses_id = ?
    ORDER BY part ASC;`;

module.exports = app => {
    app.post("/api/get-course", bodyCheck, (req, res, next) => {
        if (typeof req.body.url == null) {
            res.status(400);
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

                pool.query(getCourse, [req.body.url], (err, results) => {
                    if (err) {
                        connection.release();
                        next(new AppError(err));
                        return;
                    }

                    //if we found a course given the url
                    if(results.length !== 0) {
                        const course = results[0];

                        pool.query(getCoursesParts, [course.id], (err, results) => {
                            if (err) {
                                connection.release();
                                next(new AppError(err));
                                return;
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
                                res.send({ course, parts: results });
                            })
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
                            res.status(404);
                        })
                    }
                })
            });
        });
    })
}