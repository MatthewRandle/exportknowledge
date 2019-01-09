const AppError = require("../tools/applicationError");
const pool = require("../services/db");
const bodyCheck = require("../middleware/bodyCheck");

const checkUserAllowsCookies = `
    SELECT users_settings.accepts_cookies
    FROM users_settings
        JOIN users ON users.users_settings_id = users_settings.id
    WHERE users.oauthID = ?;`

module.exports = app => {
    app.post("/api/check-user-allows-cookies", bodyCheck, (req, res, next) => {
        if (req.body.oauthID == null || false) {
            res.send({ allowsCookies: -1 });
            return;
        }

        pool.query(checkUserAllowsCookies, [req.body.oauthID], (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            res.send({ allowsCookies: results[0].accepts_cookies });
        })
    });
};