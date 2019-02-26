const AppError = require("../../../tools/applicationError");
const pool = require("../../../services/db");
const bodyCheck = require("../../../middleware/bodyCheck");
const adminCheck = require("../../../middleware/adminCheck");

//using this deletes links and replies but not the comment itself
const deleteAllCommentLinksAndReplies = `
    DELETE courses_comments_have_replies, courses_comments_replies
        FROM courses_comments
            LEFT JOIN courses_parts_have_comments ON courses_parts_have_comments.comments_id = courses_comments.id
            LEFT JOIN courses_comments_have_replies ON courses_comments_have_replies.courses_comments_id = courses_comments.id
            LEFT JOIN courses_comments_replies ON courses_comments_replies.id = courses_comments_have_replies.replies_id
    WHERE courses_parts_have_comments.courses_parts_id = ?;`;

const deleteAllComments = `
    DELETE courses_comments, courses_parts_have_comments
    FROM courses_comments
        JOIN courses_parts_have_comments ON courses_parts_have_comments.comments_id = courses_comments.id
    WHERE courses_parts_have_comments.courses_parts_id = ?;`;

module.exports = app => {
    app.post("/api/admin/delete-all-courses-parts-comments", bodyCheck, adminCheck, (req, res, next) => {
        if (req.body.partID == null || req.user == null) {
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

                //delete comment
                connection.query(deleteAllCommentLinksAndReplies, [req.body.partID], (err, results) => {
                    if (err) {
                        return connection.rollback(function () {
                            connection.release();
                            next(new AppError(err));
                            return;
                        });
                    }

                    connection.query(deleteAllComments, [req.body.partID], (err, results) => {
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