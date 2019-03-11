const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");

const getCourseID = `
    SELECT id
    FROM courses
    WHERE url = ?
    LIMIT 1;`;

const getCoursePart = `
    SELECT part, title, video, description, length, url, text, id, courses_parts.exists, image
    FROM courses_parts
        JOIN courses_have_parts ON courses_have_parts.courses_parts_id = courses_parts.id
    WHERE url = ? AND courses_id = ?
    LIMIT 1;`;

module.exports = app => {
    app.post("/api/get-course-part", (req, res, next) => {
        if(req.body.course == null || req.body.part == null) {
            res.sendStatus(400);
            return;
        }

        pool.getConnection((err, connection) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            pool.query(getCourseID, [req.body.course], (err, results) => {
                if (err) {
                    connection.release();
                    next(new AppError(err));
                    return;
                }
                
                //if we found a course
                if(results.length === 1) {
                    const courseID = results[0].id;

                    pool.query(getCoursePart, [req.body.part, courseID], (err, results) => {
                        connection.release();

                        if (err) {
                            next(new AppError(err));
                            return;
                        }

                        //if we didnt find courses part
                        if (results.length === 0) {
                            res.status(404)
                            return;
                        }
                        else {
                            res.send({ part: results[0], courseID });
                            return;
                        }
                    })
                }
                else {
                    connection.release();
                    res.status(404);
                    return;
                }
            })
        })
    });
}