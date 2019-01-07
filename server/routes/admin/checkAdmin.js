const pool = require("../../services/db");
const AppError = require("../../tools/applicationError");

module.exports = app => {
    app.get("/api/admin/check-admin", (req, res, next) => {        
        if (!req.body || !req.user) {            
            res.send({ error: "No Body and/or user" });
            return;
        }

        pool.query("SELECT authority FROM users WHERE oauthID = ?", [req.user], (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            if(results.length > 0) {
                if (results[0].authority === 0) {
                    res.send({ error: "You do not have access to this command." });
                    return;
                }
                else {
                    res.send({ authorised: true });
                    return;
                }
            }
            else {
                res.send({ error: "You do not have access to this command." });
                return;
            }            
        });
    });        
}