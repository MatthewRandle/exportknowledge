const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");

const getSettingsID = `
    SELECT users_settings_id
    FROM users
    WHERE oauthID = ?;`

const updateUserSettings = `
    UPDATE users_settings
        SET accepts_cookies = ?
    WHERE id = ?;`

const error = "Can't retrieve settings. Please refresh the page and try again.";

module.exports = app => {
    app.post("/api/update-user-settings", bodyCheck, (req, res, next) => {
        if (req.user == null || req.body.cookieChoice == null) {
            res.status(400).send({ error });
            return;
        }

        pool.getConnection((err, connection) => {
            if(err) {
                res.status(500).send({ error });
                return;
            }

            connection.query(getSettingsID, [req.user], (err, results) => {
                if (err) {
                    connection.release();
                    next(new AppError(err));
                    return;
                }

                if(results.length > 0) {
                    const settingsID = results[0].users_settings_id;

                    pool.query(updateUserSettings, [req.body.cookieChoice, settingsID], (err, results) => {
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
                    res.status(401).send({ error });
                }               
            })
        })        
    });
}; 