module.exports = app => {
    require("./checkAdmin")(app);
    require("./article")(app);
    require("./course")(app);
}