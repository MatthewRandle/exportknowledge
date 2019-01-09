const AppError = require("../tools/applicationError");
const pool = require("../services/db");
const bodyCheck = require("../middleware/bodyCheck");

const getSettingsID = `
    SELECT users_settings_id
    FROM users
    WHERE oauthID = ?;`

const setCookieChoice = `
    UPDATE users_settings
        SET users_settings.accepts_cookies = ?
    WHERE users_settings.id = ?;`

module.exports = app => {
    app.post("/api/set-cookie-choice", bodyCheck, (req, res, next) => {
        if (req.user == null || req.user === false || req.body.choice == null) {
            res.end();
            return;
        }

        pool.getConnection((err, connection) => {
            if (err) {
                res.status(500);
                return;
            }

            connection.query(getSettingsID, [req.user], (err, results) => {
                if (err) {
                    connection.release();
                    next(new AppError(err));
                    return;
                }

                if (results.length > 0) {
                    const settingsID = results[0].users_settings_id;

                    pool.query(setCookieChoice, [req.body.choice, settingsID], (err, results) => {
                        connection.release();

                        if (err) {
                            next(new AppError(err));
                            return;
                        }

                        res.end();
                    })
                }
                else {
                    connection.release();
                    res.status(401);
                }
            })
        })     
    });
};