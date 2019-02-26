const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");

const checkUserOwnsComment = `
    SELECT users.oauthID
    FROM users
        JOIN articles_comments_replies ON users.id = articles_comments_replies.users_id
    WHERE articles_comments_replies.id = ?
    LIMIT 1;`

const deleteReply = `
    DELETE repliesLink, replies
    FROM articles_comments_have_replies as repliesLink
        LEFT JOIN articles_comments_replies as replies ON replies.id = repliesLink.replies_id
    WHERE repliesLink.replies_id = ?;`

const checkAdmin = "SELECT authority FROM users WHERE oauthID = ?;";

module.exports = app => {
    app.post("/api/delete-articles-comment-reply", bodyCheck, (req, res, next) => {
        if (typeof req.body.replyID == null || typeof req.user == null) {
            res.sendStatus(400);
            return;
        }

        pool.getConnection((err, connection) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            connection.query(checkUserOwnsComment, [req.body.replyID], (err, results) => {
                if (err) {
                    connection.release();
                    next(new AppError(err));
                    return;
                }

                //if user owns comment
                if (results.length === 1 && results[0].oauthID === req.user) {
                    //delete comment
                    connection.query(deleteReply, [req.body.replyID], (err, results) => {
                        connection.release();

                        if (err) {
                            next(new AppError(err));
                            return;
                        }

                        res.end();
                        return;
                    });
                }
                else {
                    //Check if admin is making this request
                    connection.query(checkAdmin, [req.user], (err, results) => {
                        if (err) {
                            connection.release();
                            next(new AppError(err));
                            return;
                        }

                        //if no admin exists
                        if (results[0].authority === 0) {
                            connection.release();
                            res.sendStatus(401);
                            return;
                        }
                        else {
                            //delete comment
                            connection.query(deleteReply, [req.body.replyID], (err, results) => {
                                connection.release();

                                if (err) {
                                    next(new AppError(err));
                                    return;
                                }

                                res.end();
                                return;
                            })
                        }
                    });
                }
            })
        });
    });
}