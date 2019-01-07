const AppError = require("../../../tools/applicationError");
const pool = require("../../../services/db");
const bodyCheck = require("../../../middleware/bodyCheck");
const adminCheck = require("../../../middleware/adminCheck");

//using this deletes links and replies but not the comment itself
const deleteAllCommentLinksAndReplies = `
    DELETE articles_comments_have_replies, articles_comments_replies
        FROM articles_comments
            LEFT JOIN articles_have_comments ON articles_have_comments.comments_id = articles_comments.id
            LEFT JOIN articles_comments_have_replies ON articles_comments_have_replies.articles_comments_id = articles_comments.id
            LEFT JOIN articles_comments_replies ON articles_comments_replies.id = articles_comments_have_replies.replies_id
    WHERE articles_have_comments.articles_id = ?;`;

const deleteAllComments = `
    DELETE articles_comments, articles_have_comments
    FROM articles_comments
        JOIN articles_have_comments ON articles_have_comments.comments_id = articles_comments.id
    WHERE articles_have_comments.articles_id = ?;`;

module.exports = app => {
    app.post("/api/admin/delete-all-articles-comments", bodyCheck, adminCheck, (req, res, next) => {
        if (req.body.articleID == null || req.user == null) {
            res.status(400).send({ error })
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
                
                //delete comment
                connection.query(deleteAllCommentLinksAndReplies, [req.body.articleID], (err, results) => {
                    if (err) {
                        return connection.rollback(function () {
                            connection.release();
                            next(new AppError(err));
                            return;
                        });
                    }

                    connection.query(deleteAllComments, [req.body.articleID], (err, results) => {
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
                            return;
                        })
                    });
                });
            })
        });
    });
}