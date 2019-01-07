module.exports = app => {
    require("./newArticle")(app);
    require("./editArticle")(app);
    require("./getArticlesPrerequisites")(app);
    require("./getAllArticles")(app);
    require("./deleteArticle")(app);
    require("./deleteAllComments")(app);
}