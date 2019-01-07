const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");

const newReply = `
    INSERT INTO articles_comments_replies
        (comment, timestamp, users_id, upvotes)
        VALUES (?, NOW(), ?, 0);`

const newReplyLink = `
    INSERT INTO articles_comments_have_replies
        (articles_comments_id, replies_id)
        VALUES (?, ?);`

const getUserID = `
    SELECT id
    FROM users
    WHERE oauthID = ?;
`;

module.exports = app => {
    app.post("/api/new-article-comment-reply", bodyCheck, (req, res, next) => {
        if (typeof req.body.commentID == null ||
            typeof req.body.comment == null ||
            typeof req.user == null) {
            res.status(400).send({ error });
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
                        connection.query(newReply, [req.body.comment, results[0].id], (err, results) => {
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
                            res.status(401).send({ error });
                        })
                    }
                })
            });
        });
    });
}; 