const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");
const ta = require("time-ago");

const getArticlesComments = `
    SELECT 
        /* GET users oauthID */
            users_comment.oauthID as "commenter_oauthID",
            users_reply.oauthID as "replier_oauthID",
        /* GET MAIN COMMENTS */ 
            articles_comments.comment, 
            articles_comments.timestamp, 
            articles_comments.upvotes,
            articles_comments.id,
        /* GET COMMENTS REPLIES */ 
            articles_comments_replies.comment as "reply", 
            articles_comments_replies.timestamp as "reply_timestamp", 
            articles_comments_replies.upvotes as "reply_upvotes",
            articles_comments_replies.id as "reply_id",
        /* GET COMMENTS AUTHOR */
            commenter.forename as "commenter_forename", 
            commenter.surname as "commenter_surname",
            commenter.profile_picture as "commenter_profile_picture",
        /* GET REPLIES AUTHORS */
            replier.forename as "replier_forename", 
            replier.surname as "replier_surname",
            replier.profile_picture as "replier_profile_picture"
    FROM articles_comments
        LEFT JOIN articles_have_comments ON articles_have_comments.comments_id = articles_comments.id        
        LEFT JOIN articles_comments_have_replies ON articles_comments_have_replies.articles_comments_id = articles_comments.id
        LEFT JOIN articles_comments_replies ON articles_comments_replies.id = articles_comments_have_replies.replies_id

        /* GET USERS TWICE, ONCE FOR COMMENTS, AND ONCE FOR REPLIES */
        LEFT JOIN users users_comment ON users_comment.id = articles_comments.users_id
        LEFT JOIN users users_reply ON users_reply.id = articles_comments_replies.users_id

        /* GET AUTHORS OF COMMENTS AND REPLIES BASED ON VALUE FROM ABOVE SO IT IS SPECIFIC TO AS COMMENT OR REPLY */
        LEFT JOIN users_settings commenter ON commenter.id = users_comment.users_settings_id
        LEFT JOIN users_settings replier ON replier.id = users_reply.users_settings_id
    WHERE articles_have_comments.articles_id = ?;`

module.exports = app => {
    app.post("/api/get-articles-comments",  bodyCheck,(req, res, next) => {

        if (typeof req.body.articleID == null) {
            res.sendStatus(400);
            return;
        }

        pool.query(getArticlesComments, [req.body.articleID], (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            results.forEach(comment => {
                comment.timestamp = ta.ago(new Date(comment.timestamp));
                console.log(comment.timestamp);
            })

            res.send({ comments: results });
        })
    });
}