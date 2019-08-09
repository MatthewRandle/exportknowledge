const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");

const getAllArticles = `
    SELECT articles.id, url, title, image, timestamp, text_preview, articles.exists, tags.name as "tags", count(articles_have_comments.articles_id) as "comments",count(articles_comments_have_replies.replies_id) as "replies"
    FROM articles
        JOIN articles_tags ON articles.id = articles_tags.articles_id
        JOIN tags ON articles_tags.tags_id = tags.id
        LEFT JOIN articles_have_comments ON articles.id = articles_have_comments.articles_id
        LEFT JOIN articles_comments_have_replies ON articles_have_comments.comments_id = articles_comments_have_replies.articles_comments_id
    GROUP BY articles.id, url, title, image, text, text_preview, timestamp, articles.exists, tags.name
    ORDER BY timestamp DESC;
`;

module.exports = app => {
    app.get("/api/get-all-articles", (req, res, next) => {
        pool.query(getAllArticles, (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            res.send({ allArticles: results });
        });
    });
}