const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");

const newComment = `
    INSERT INTO courses_comments
        (comment, timestamp, users_id, upvotes)
        VALUES (?, NOW(), ?, 0);`

const newCommentLink = `
    INSERT INTO courses_parts_have_comments
        (courses_parts_id, comments_id)
        VALUES (?, ?);`

const getUserID = `
    SELECT id
    FROM users
    WHERE oauthID = ?;
`;

module.exports = app => {
    app.post("/api/new-course-part-comment", bodyCheck, (req, res, next) => {
        if (typeof req.body.partID == null ||
            typeof req.body.comment == null ||
            typeof req.user == null) {
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
                        connection.query(newComment, [req.body.comment, results[0].id], (err, results) => {
                            if (err) {
                                return connection.rollback(function () {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                });
                            }

                            const commentID = results.insertId;

                            //Make link between course and its comments (courses_have_comments)
                            connection.query(newCommentLink, [req.body.partID, commentID], (err, results) => {
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