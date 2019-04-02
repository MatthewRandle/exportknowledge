const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");
const moment = require("moment");

const newReply = `
    INSERT INTO courses_comments_replies
        (comment, timestamp, users_id, upvotes)
        VALUES (?, ?, ?, 0);`

const newReplyLink = `
    INSERT INTO courses_comments_have_replies
        (courses_comments_id, replies_id)
        VALUES (?, ?);`

const getUserID = `
    SELECT id
    FROM users
    WHERE oauthID = ?;
`;

module.exports = app => {
    app.post("/api/new-courses-comment-reply", bodyCheck, (req, res, next) => {
        if (req.body.commentID == null ||
            req.body.comment == null ||
            req.user == null) {
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

                connection.query(getUserID, [req.user], (err, results) => {
                    if (err) {
                        return connection.rollback(function () {
                            connection.release();
                            next(new AppError(err));
                            return;
                        });
                    }

                    //if we got a user
                    if (results.length === 1) {
                        //Make comment into articles_comments table
                        connection.query(newReply, [req.body.comment, moment().format(), results[0].id], (err, results) => {
                            if (err) {
                                return connection.rollback(function () {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                });
                            }

                            const replyID = results.insertId;

                            //Make link between article and its comments (articles_have_comments)
                            connection.query(newReplyLink, [req.body.commentID, replyID], (err, results) => {
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
                            res.sendStatus(401);
                        })
                    }
                })
            });
        });
    });
}; 