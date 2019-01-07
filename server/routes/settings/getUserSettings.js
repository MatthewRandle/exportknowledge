const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");

const getUserSettings = `
    SELECT forename, surname, email, accepts_cookies
    FROM users_settings
        JOIN users ON users.users_settings_id = users_settings.id
    WHERE users.oauthID = ?
    LIMIT 1;`

const error = "Can't retrieve settings. Please refresh the page and try again.";

module.exports = app => {
    app.post("/api/get-user-settings", bodyCheck, (req, res, next) => {
        if(req.user == null && req.body.user == null) {
            res.status(400).send({ error });
            return;
        }        

        pool.query(getUserSettings, [req.body.user || req.user], (err, results) => {
            if(err) {
                next(new AppError(err));
                return;
            }

            res.send({ settings: results[0] });
        })
    });
}; 