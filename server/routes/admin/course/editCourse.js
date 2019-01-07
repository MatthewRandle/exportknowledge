const AppError = require("../../../tools/applicationError");
const pool = require("../../../services/db");
const adminCheck = require("../../../middleware/adminCheck");

const editCourse = `
    UPDATE courses
        SET title = ?,
        description = ?,
        preview_description = ?,
        video = ?,
        image = ?,
        url = ?,
        courses.exists = ?,
        categories_id = ?,
        who_for = ?,
        what_learn = ?,
        prerequisites = ?
    WHERE id = ?;`

module.exports = app => {
    app.post("/api/admin/edit-course", adminCheck, (req, res, next) => {
        if (
            req.body.id == null || 
            req.body.title == null || 
            req.body.description == null || 
            req.body.preview == null || 
            req.body.video == null || 
            req.body.image == null || 
            req.body.url == null || 
            req.body.exists == null || 
            req.body.category == null ||
            req.body.whatLearn == null ||
            req.body.whoFor == null ||
            req.body.prerequisites == null) 
        {
            res.send({ error: "No Body" });
            return;
        }

        pool.query(editCourse, 
        [
            req.body.title, 
            req.body.description, 
            req.body.preview, 
            req.body.video, 
            req.body.image, 
            req.body.url, 
            req.body.exists, 
            req.body.category,             
            req.body.whoFor,
            req.body.whatLearn,
            req.body.prerequisites,
            req.body.id
        ], 
        (err, results) => {
            if(err) {
                next(new AppError(err));
                return;
            }

            res.end();
        })
    })
}