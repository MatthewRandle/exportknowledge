const AppError = require("../../../tools/applicationError");
const pool = require("../../../services/db");
const adminCheck = require("../../../middleware/adminCheck");

const getCoursePartID = `
    SELECT courses_parts.id
    FROM courses_parts
        JOIN courses_have_parts ON courses_have_parts.courses_parts_id = courses_parts.id
        JOIN courses ON courses_have_parts.courses_id = courses.id
    WHERE courses.url = ?
    AND courses_parts.url = ?
    LIMIT 1;`

const editCoursePart = `
    UPDATE courses_parts
        SET part = ?,
        title = ?,
        video = ?,
        length = ?,
        description = ?,
        url = ?,
        text = ?,
        courses_parts.exists = ?,
        image = ?
    WHERE id = ?;`

module.exports = app => {
    app.post("/api/admin/edit-course-part", adminCheck, (req, res, next) => {
        if (req.body.courseURL == null ||
            req.body.partURL == null ||
            req.body.title == null ||
            req.body.description == null ||
            req.body.video == null ||
            req.body.url == null ||
            req.body.length == null ||
            req.body.part == null ||
            req.body.text == null ||
            req.body.exists == null) {
            res.send({ error: "No Body" });
            return;
        }

        pool.getConnection((err, connection) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            pool.query(getCoursePartID, [req.body.courseURL, req.body.partURL], (err, results) => {
                if (err) {
                    connection.release();
                    next(new AppError(err));
                    return;
                }

                const coursePartID = results[0].id;

                pool.query(editCoursePart, 
                    [
                        req.body.part,
                        req.body.title, 
                        req.body.video, 
                        req.body.length,
                        req.body.description,
                        req.body.url,  
                        req.body.text,
                        req.body.exists,
                        req.body.image,
                        coursePartID 
                    ], (err, results) => {

                    connection.release();
                    
                    if (err) {
                        next(new AppError(err));
                        return;
                    }

                    res.end();
                })
            })
        })
    })
}