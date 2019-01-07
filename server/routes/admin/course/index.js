module.exports = app => {
    require("./getAllCourses")(app);
    require("./newCourse")(app);
    require("./editCourse")(app);
    require("./editCoursePart")(app);
    require("./deleteCourse")(app);
    require("./deleteCoursePart")(app);
    require("./newCoursePart")(app);
    require("./deleteAllPartsComments")(app);
}