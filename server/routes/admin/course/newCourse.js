const AppError = require("../../../tools/applicationError");
const pool = require("../../../services/db");
const adminCheck = require("../../../middleware/adminCheck");

const newCourse = `
    INSERT INTO courses
    (title, timestamp, description, preview_description, video, image, courses.exists, url, categories_id, who_for, what_learn, prerequisites)
    VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`

module.exports = app => {
    app.post("/api/admin/new-course", adminCheck, (req, res, next) => {
        if (req.body.url == null || 
            req.body.title == null || 
            req.body.preview == null || 
            req.body.video == null || 
            req.body.exists == null || 
            req.body.category == null || 
            req.body.description == null ||
            req.body.whoFor == null || 
            req.body.whatLearn == null,
            req.body.prerequisites == null) 
        {
            res.send({ error: "No Body" });
            return;
        }

        pool.query(newCourse, 
            [
                req.body.title, 
                req.body.description, 
                req.body.preview, 
                req.body.video, 
                req.body.image, 
                req.body.exists, 
                req.body.url, 
                req.body.category,
                req.body.whoFor,
                req.body.whatLearn,
                req.body.prerequisites
            ], 
            (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            res.end();
        })
    })
}