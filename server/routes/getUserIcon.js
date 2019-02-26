const AppError = require("../tools/applicationError");
const pool = require("../services/db");
const bodyCheck = require("../middleware/bodyCheck");

const getUserIcon = `
    SELECT users_settings.profile_picture
    FROM users_settings
        JOIN users ON users.users_settings_id = users_settings.id
    WHERE users.oauthID = ?;`;

module.exports = app => {
    app.post("/api/get-user-icon", bodyCheck, (req, res, next) => {
        if (req.body.user == null || false) {
            res.sendStatus(401);
            return;
        }

        pool.query(getUserIcon, [req.body.user], (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            res.send({ icon: results[0].profile_picture });
        });
    });
};