const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");
const moment = require("moment");

const newComment = `
    INSERT INTO articles_comments
        (comment, timestamp, users_id, upvotes)
        VALUES (?, ?, ?, 0);`

const newCommentLink = `
    INSERT INTO articles_have_comments
        (articles_id, comments_id)
        VALUES (?, ?);`

const getUserID = `
    SELECT id
    FROM users
    WHERE oauthID = ?;
`;

module.exports = app => {
    app.post("/api/new-article-comment", bodyCheck, (req, res, next) => {
        if (req.body.articleID == null || 
            req.body.comment == null || 
            req.user == null) 
        {
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
                    if(results.length === 1) {
                        //Make comment into articles_comments table
                        connection.query(newComment, [req.body.comment, moment().format(), results[0].id], (err, results) => {
                            if (err) {
                                return connection.rollback(function () {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                });
                            }

                            const commentID = results.insertId;

                            //Make link between article and its comments (articles_have_comments)
                            connection.query(newCommentLink, [req.body.articleID, commentID], (err, results) => {
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