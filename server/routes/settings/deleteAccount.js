const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");

const getUserID = `
    SELECT id
    FROM users
    WHERE oauthID = ?;
`;

const changeArticlesComments = `
    UPDATE articles_comments
    SET users_id = -666
    WHERE users_id = ?;
`;

const changeArticlesReplies = `
    UPDATE articles_comments_replies
    SET users_id = -666
    WHERE users_id = ?;
`;

const changeCoursesComments = `
    UPDATE courses_comments
    SET users_id = -666
    WHERE users_id = ?;
`;

const changeCoursesReplies = `
    UPDATE courses_comments_replies
    SET users_id = -666
    WHERE users_id = ?;
`;

const getSettingsID = `
    SELECT users_settings.id
    FROM users_settings
        JOIN users ON users.users_settings_id = users_settings.id
    WHERE users.id = ?;
;`

const deleteAccount = `
    DELETE FROM users
    WHERE id = ?;    
;`

const deleteUserSettings = `
    DELETE FROM users_settings
    WHERE id = ?;    
;`

const error = "Can't delete account. Please refresh the page and try again.";

module.exports = app => {
    app.get("/api/delete-account", bodyCheck, (req, res, next) => {
        if (req.user == null ) {
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

                    const userID = results[0].id

                    connection.query(changeArticlesComments, [userID], (err, results) => {
                        if (err) {
                            return connection.rollback(function () {
                                connection.release();
                                next(new AppError(err));
                                return;
                            });
                        }

                        connection.query(changeArticlesReplies, [userID], (err, results) => {
                            if (err) {
                                return connection.rollback(function () {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                });
                            }
                            
                            connection.query(changeCoursesComments, [userID], (err, results) => {
                                if (err) {
                                    return connection.rollback(function () {
                                        connection.release();
                                        next(new AppError(err));
                                        return;
                                    });
                                }

                                connection.query(changeCoursesReplies, [userID], (err, results) => {
                                    if (err) {
                                        return connection.rollback(function () {
                                            connection.release();
                                            next(new AppError(err));
                                            return;
                                        });
                                    }

                                    connection.query(getSettingsID, [userID], (err, results) => {
                                        if (err) {
                                            return connection.rollback(function () {
                                                connection.release();
                                                next(new AppError(err));
                                                return;
                                            });
                                        }

                                        const settingsID = results[0].id;

                                        connection.query(deleteAccount, [userID], (err, results) => {
                                            if (err) {
                                                return connection.rollback(function () {
                                                    connection.release();
                                                    next(new AppError(err));
                                                    return;
                                                });
                                            }

                                            connection.query(deleteUserSettings, [settingsID], (err, results) => {
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
                                                    res.send({ success: true });
                                                    return;
                                                })
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                })
            });
        });
    });
}; 