module.exports = app => {
    require("./getLatestCourses")(app);
    require("./getAllCourses")(app);
    require("./getComments")(app);
    require("./getCourse")(app);
    require("./getCoursePart")(app);
    require("./getCategories")(app);
    require("./deleteComment")(app);
    require("./deleteCommentReply")(app);
    require("./newComment")(app);
    require("./newCommentReply")(app);
};