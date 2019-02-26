const pool = require("../../../services/db");
const AppError = require("../../../tools/applicationError");
const bodyCheck = require("../../../middleware/bodyCheck");

const getArticlesPrerequisites = `
    SELECT articles.title, articles.id, articles.url
    FROM articles_prerequisites
        JOIN articles ON articles.id = articles_prerequisites.prerequisites_id
    WHERE articles_prerequisites.articles_id = ?;`

module.exports = app => {
    //need one for admin because we want all prerequisites wether they exist or not
    app.post("/api/admin/get-articles-prerequisites", bodyCheck, (req, res, next) => {
        if (req.body.id == null) {
            res.send({ error: "No ID" });
            return;
        }

        pool.query(getArticlesPrerequisites, [req.body.id], (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }
            console.log(results)

            res.send({ prerequisites: results });
        });
    });
}