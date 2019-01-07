const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");

const getAllTags = `
    SELECT name, id
    FROM tags;
`;

module.exports = app => {
    app.get("/api/get-all-tags", (req, res, next) => {
        pool.query(getAllTags, (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            res.send({ tags: results });
        });
    });
}