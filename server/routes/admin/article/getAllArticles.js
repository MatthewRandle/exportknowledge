const pool = require("../../../services/db");
const AppError = require("../../../tools/applicationError");
const adminCheck = require("../../../middleware/adminCheck");

const getAllArticles = `
    SELECT id, url, title, image, text, video, articles.exists, timestamp, description
    FROM articles;`

module.exports = app => {
    app.get("/api/admin/get-all-articles", (req, res, next) => {
        pool.query(getAllArticles, (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            res.send({ allArticles: results });
        });
    });
}