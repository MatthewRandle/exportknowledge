const AppError = require("../../../tools/applicationError");
const pool = require("../../../services/db");

const getAllCourses = `
    SELECT courses.url, courses.title, courses.timestamp, courses.preview_description as "description", courses.image, courses.exists, sum(courses_parts.length) as "length"
    FROM courses
        LEFT JOIN courses_have_parts ON courses.id = courses_have_parts.courses_id
        LEFT JOIN courses_parts ON courses_have_parts.courses_parts_id = courses_parts.id
    GROUP BY courses.url, courses.title, courses.timestamp, courses.preview_description, courses.image, courses.exists;`

module.exports = app => {
    app.get("/api/admin/get-all-courses", (req, res, next) => {
        pool.query(getAllCourses, (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            res.send({ courses: results });
        })
    })
}