const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");

const getLatestCourses = `
    SELECT courses.url, courses.title, courses.timestamp, courses.preview_description as "description", courses.image, sum(courses_parts.length) as "length"
    FROM courses
        JOIN courses_have_parts ON courses.id = courses_have_parts.courses_id
        JOIN courses_parts ON courses_have_parts.courses_parts_id = courses_parts.id
    WHERE courses.exists = 1 AND courses_parts.exists = 1
    GROUP BY courses.url, courses.title, courses.timestamp, courses.preview_description, courses.image
    ORDER BY courses.timestamp DESC
    LIMIT 3;`;

module.exports = app => {
    app.get("/api/get-latest-courses", (req, res, next) => {
        pool.query(getLatestCourses, (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            res.send({ latest: results });
        });
    });
};