const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");

const getLatestCourses = `
    SELECT courses.url, courses.title, courses.preview_description as "description", courses.video, courses.image
    FROM courses
    WHERE courses.exists = 1
    ORDER BY courses.timestamp DESC
    LIMIT 2;`;

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