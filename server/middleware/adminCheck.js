const pool = require("../services/db");
const AppError = require("../tools/applicationError");

const checkAdmin = "SELECT authority FROM users WHERE oauthID = ?;"

module.exports = (req, res, next) => {
    if(req.user == null && req.body.user == null) {
        res.sendStatus(401);
        return;
    }

    pool.getConnection((err, connection) => {
        if (err) {
            next(new AppError(err));
            return;
        }

        //Check if admin is making this request
        connection.query(checkAdmin, [req.user], (err, results) => {
            connection.release();

            if (err) {
                next(new AppError(err));
                return;
            }

            if(results.length > 0) {
                if (results[0].authority === 0) {
                    res.sendStatus(401);
                    return;
                }
            }
            else if(results.length === 0) {
                res.sendStatus(401);
                return;
            }
            
            next();            
        });
    });
};