const AppError = require("../../tools/applicationError");
const pool = require("../../services/db");
const bodyCheck = require("../../middleware/bodyCheck");

const getComments = `
    SELECT 
        /* GET users oauthID */
            users_comment.oauthID as "commenter_oauthID",
            users_reply.oauthID as "replier_oauthID",
        /* GET MAIN COMMENTS */ 
            courses_comments.comment, 
            courses_comments.timestamp, 
            courses_comments.upvotes, 
            courses_comments.id,
        /* GET COMMENTS REPLIES */ 
            courses_comments_replies.comment as "reply", 
            courses_comments_replies.timestamp as "reply_timestamp", 
            courses_comments_replies.upvotes as "reply_upvotes",
            courses_comments_replies.id as "reply_id",
        /* GET COMMENTS AUTHOR */
            commenter.forename as "commenter_forename", 
            commenter.surname as "commenter_surname", 
            commenter.profile_picture as "commenter_profile_picture",
            commenter_user.authority as "commenter_authority",
        /* GET REPLIES AUTHORS */
            replier.forename as "replier_forename", 
            replier.surname as "replier_surname",
            replier.profile_picture as "replier_profile_picture",
            replier_user.authority as "replier_authority"
    FROM courses_comments
        LEFT JOIN courses_parts_have_comments ON courses_parts_have_comments.comments_id = courses_comments.id        
        LEFT JOIN courses_comments_have_replies ON courses_comments_have_replies.courses_comments_id = courses_comments.id
        LEFT JOIN courses_comments_replies ON courses_comments_replies.id = courses_comments_have_replies.replies_id

        /* GET USERS TWICE, ONCE FOR COMMENTS, AND ONCE FOR REPLIES */
        LEFT JOIN users users_comment ON users_comment.id = courses_comments.users_id
        LEFT JOIN users users_reply ON users_reply.id = courses_comments_replies.users_id

        /* GET AUTHORS OF COMMENTS AND REPLIES BASED ON VALUE FROM ABOVE SO IT IS SPECIFIC TO AS COMMENT OR REPLY */
        LEFT JOIN users_settings commenter ON commenter.id = users_comment.users_settings_id
        LEFT JOIN users_settings replier ON replier.id = users_reply.users_settings_id
        LEFT JOIN users commenter_user ON commenter.id = commenter_user.users_settings_id
         LEFT JOIN users replier_user ON replier.id = replier_user.users_settings_id
    WHERE courses_parts_have_comments.courses_parts_id = ?;`

module.exports = app => {
    app.post("/api/get-course-part-comments", bodyCheck, (req, res, next) => {
        if (req.body.partID == null) {
            res.status(400);
            return;
        }

        pool.query(getComments, [req.body.partID], (err, results) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            res.send({ comments: results });
        })
    });
}