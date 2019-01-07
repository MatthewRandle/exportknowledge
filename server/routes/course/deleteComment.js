const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");

const checkUserOwnsComment = `
    SELECT users.oauthID
    FROM users
        JOIN courses_comments ON users.id = courses_comments.users_id
    WHERE courses_comments.id = ?
    LIMIT 1;`

//using this deletes links and replies but not the comment itself
const deleteCommentLinkAndReplies = `
    DELETE courses_comments_have_replies, courses_comments_replies, courses_parts_have_comments
        from courses_comments
            LEFT JOIN courses_parts_have_comments ON courses_parts_have_comments.comments_id = courses_comments.id
            LEFT JOIN courses_comments_have_replies ON courses_comments_have_replies.courses_comments_id = courses_comments.id
            LEFT JOIN courses_comments_replies ON courses_comments_replies.id = courses_comments_have_replies.replies_id
    WHERE courses_comments.id = ?;`;

const deleteComment = `
    DELETE from courses_comments
    WHERE courses_comments.id = ?`;

const checkAdmin = "SELECT authority FROM users WHERE oauthID = ?;";
const error = "Something went wrong whilst trying to delete the comment. Please refresh the page and try again.";

module.exports = app => {
    app.post("/api/delete-course-part-comment", bodyCheck, (req, res, next) => {
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