const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");

const getCategories = `
    SELECT *
    FROM categories;`

module.exports = app => {
    app.get("/api/get-categories", (req, res, next) => {
        pool.query(getCategories, (err, results) => {
            if(err) {
                next(new AppError(err));
                return;
            }

            res.send({ categories: results });
        })
    });
}