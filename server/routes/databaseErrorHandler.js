const DATABASE_ERROR = require("../../utils/errorTypes").databaseError;
const FATAL_ERROR = require("../../utils/errorTypes").fatalError;

module.exports = app => {
    app.use((err, req, res, next) => {
        if(err.sqlState != null) {
            if(err.fatal === true) {
                res.send({ error: { type: FATAL_ERROR, customMessage: "Something went wrong whilst querying the database. Please try again.", code: 503 } })
                res.end();
            }
            else {
                res.send({ error: { type: DATABASE_ERROR, sqlCode: err.code, sqlMessage: err.sqlMessage } })
                res.end();
            }
        }

        next(err);
    })
}