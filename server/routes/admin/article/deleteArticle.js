const pool = require("../../../services/db");
const AppError = require("../../../tools/applicationError");
const adminCheck = require("../../../middleware/adminCheck");
const bodyCheck = require("../../../middleware/bodyCheck");

const deleteArticlesPrerequisites = `
    DELETE FROM articles_prerequisites
    WHERE prerequisites_id = ?
    OR articles_id = ?;`

const deleteArticlesTags = `
    DELETE FROM articles_tags
    WHERE articles_id = ?;`

const deleteArticle = `
    DELETE FROM articles
    WHERE id = ?;`

module.exports = app => {
    app.post("/api/admin/delete-article", bodyCheck, adminCheck, (req, res, next) => {
        if (typeof req.body.id == null) {
            res.send({ error: "No ID" });
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

                connection.query(deleteArticlesPrerequisites, [req.body.id, req.body.id], (err, results) => {
                    if (err) {
                        return connection.rollback(function () {
                            connection.release();
                            next(new AppError(err));
                            return;
                        }); 
                    }

                    //delete all the articles tags so we can add new ones
                    connection.query(deleteArticlesTags, [req.body.id], (err, results) => {
                        if (err) {
                            return connection.rollback(function () {
                                connection.release();
                                next(new AppError(err));
                                return;
                            }); 
                        }

                        connection.query(deleteArticle, [req.body.id], (err, results) => {
                            if (err) {
                                return connection.rollback(function () {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                }); 
                            }

                            connection.commit((err) => {
                                if (err) {
                                    return connection.rollback(function () {
                                        connection.release();
                                        next(new AppError(err));
                                        return;
                                    });
                                }

                                connection.release();
                                res.end();
                            }) 
                        });
                    });
                });
            })
        });
    });
};