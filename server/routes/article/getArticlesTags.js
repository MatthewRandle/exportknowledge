const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");

const getArticlesTags = `
    SELECT tags.name, tags.id
    FROM tags
        JOIN articles_tags ON articles_tags.tags_id = tags.id
    WHERE articles_tags.articles_id = ?;
`;

module.exports = app => {
    app.post("/api/get-articles-tags", bodyCheck, (req, res, next) => {
        if (typeof req.body.id == null) {
            res.end();
            return;
        }

        pool.query(getArticlesTags, [req.body.id], (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            if (results.length <= 0) {
                res.send({ error: "No tags exist", tags: [] });
            }
            else {
                res.send({ tags: results });
            }
        });
    });
}