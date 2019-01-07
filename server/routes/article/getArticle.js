const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");

const getArticle = `
    SELECT *
    FROM articles
    WHERE url = ?
    LIMIT 1;`

const getPrerequisites = `
    SELECT articles.title, articles.id, articles.url
    FROM articles_prerequisites
        JOIN articles ON articles.id = articles_prerequisites.prerequisites_id
    WHERE articles_prerequisites.articles_id = ? AND articles.exists;`

const getFurtherReading = `
    SELECT articles.title, articles.id, articles.url
    FROM articles
    WHERE articles.id IN (
            SELECT articles_prerequisites.articles_id
            FROM articles_prerequisites
            WHERE articles_prerequisites.prerequisites_id = ?
        )
    AND articles.exists = 1;`

module.exports = app => {
    app.post("/api/get-article", bodyCheck, (req, res, next) => {
        if (req.body.url == null) {
            res.sendStatus(400);
            return;
        }

        pool.getConnection((err, connection) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    next(new AppError(err));
                    return;
                }

                pool.query(getArticle, [req.body.url], (err, results) => {
                    if (err) {
                        connection.release();
                        next(new AppError(err));
                        return;
                    }

                    //if we found a article given the url
                    if (results.length !== 0) {
                        const article = results[0];

                        pool.query(getPrerequisites, [article.id], (err, results) => {
                            if (err) {
                                connection.release();
                                next(new AppError(err));
                                return;
                            }

                            const prerequisites = results;

                            pool.query(getFurtherReading, [article.id], (err, results) => {
                                if (err) {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                }

                                const furtherReading = results;

                                connection.commit((err) => {
                                    if (err) {
                                        return connection.rollback(function () {
                                            connection.release();
                                            next(new AppError(err));
                                            return;
                                        });
                                    }

                                    connection.release();
                                    res.send({ article, prerequisites, furtherReading });
                                })
                            });
                        });
                    }
                    else {
                        connection.commit((err) => {
                            if (err) {
                                return connection.rollback(function () {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                });
                            }

                            connection.release();
                            res.sendStatus(404);
                        })
                    }
                })
            });
        });
    })
}