const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");

const checkUserOwnsComment = `
    SELECT users.oauthID
    FROM users
        JOIN articles_comments ON users.id = articles_comments.users_id
    WHERE articles_comments.id = ?
    LIMIT 1;`

//using this deletes links and replies but not the comment itself
const deleteCommentLinkAndReplies = `
    DELETE articles_comments_have_replies, articles_comments_replies, articles_have_comments
        from articles_comments
            LEFT JOIN articles_have_comments ON articles_have_comments.comments_id = articles_comments.id
            LEFT JOIN articles_comments_have_replies ON articles_comments_have_replies.articles_comments_id = articles_comments.id
            LEFT JOIN articles_comments_replies ON articles_comments_replies.id = articles_comments_have_replies.replies_id
    WHERE articles_comments.id = ?;`;

const deleteComment = `
    DELETE from articles_comments
    WHERE articles_comments.id = ?`;

const checkAdmin = "SELECT authority FROM users WHERE oauthID = ?;";

module.exports = app => {
    app.post("/api/delete-articles-comment", bodyCheck, (req, res, next) => {
        if (req.body.commentID == null || req.user == null) {
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

                connection.query(checkUserOwnsComment, [req.body.commentID], (err, results) => {
                    if (err) {
                        return connection.rollback(function () {
                            connection.release();
                            next(new AppError(err));
                            return;
                        });
                    }

                    //if user owns comment
                    if (results.length === 1 && results[0].oauthID === req.user) {
                        //delete comment
                        connection.query(deleteCommentLinkAndReplies, [req.body.commentID], (err, results) => {
                            if (err) {
                                return connection.rollback(function () {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                });
                            }     

                            connection.query(deleteComment, [req.body.commentID], (err, results) => {
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
                    }
                    else {
                        //Check if admin is making this request
                        connection.query(checkAdmin, [req.user], (err, results) => {
                            if (err) {
                                return connection.rollback(function () {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                });
                            }

                            //if no admin exists
                            if (results[0].authority === 0) {
                                connection.commit((err) => {
                                    if (err) {
                                        return connection.rollback(function () {
                                            connection.release();
                                            next(new AppError(err));
                                            return;
                                        });
                                    }

                                    connection.release();
                                    res.status(401).send({ error });
                                    return;
                                })
                            }
                            else {
                                //delete comment
                                connection.query(deleteCommentLinkAndReplies, [req.body.commentID], (err, results) => {
                                    if (err) {
                                        return connection.rollback(function () {
                                            connection.release();
                                            next(new AppError(err));
                                            return;
                                        });
                                    }   

                                    connection.query(deleteComment, [req.body.commentID], (err, results) => {
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
                                })
                            }
                        });
                    }
                })
            });
        });
    });
}