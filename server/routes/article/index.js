module.exports = app => {
    require("./getAllTags")(app);
    require("./getAllArticles")(app);
    require("./getArticle")(app);
    require("./getComments")(app);
    require("./getArticlesTags")(app);
    require("./deleteComment")(app);
    require("./deleteCommentReply")(app);
    require("./newComment")(app);
    require("./newCommentReply")(app);
}