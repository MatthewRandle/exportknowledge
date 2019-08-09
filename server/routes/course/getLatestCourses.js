const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");

const getLatestCourses = `
    SELECT courses.url as "course_url", courses.title, courses.description, courses.video, courses.image, courses_parts.url as "part_url"
    FROM courses
        JOIN courses_have_parts ON courses_id = courses.id
        JOIN courses_parts ON courses_parts_id = courses_parts.id
    WHERE courses.exists = 1 AND courses_parts.part = 1
    ORDER BY courses.timestamp DESC
    LIMIT 1;`;

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