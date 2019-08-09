const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");

const getAllCourses = `
    SELECT  courses.url as "course_url", 
            courses.title, 
            courses.description, 
            courses.image, 
            courses_parts.url as "part_url"           
    FROM courses
        JOIN courses_have_parts ON courses.id = courses_have_parts.courses_id
        JOIN courses_parts ON courses_have_parts.courses_parts_id = courses_parts.id
        JOIN categories ON courses.categories_id = categories.id
    WHERE courses.exists = 1 AND courses_parts.exists = 1 AND courses_parts.part = 1
    GROUP BY courses.url, courses.title, courses.description, courses.image, courses_parts.url;`

module.exports = app => {
    app.get("/api/get-all-courses", (req, res, next) => {
        pool.query(getAllCourses, (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            res.send({ courses: results });
        })
    })
}