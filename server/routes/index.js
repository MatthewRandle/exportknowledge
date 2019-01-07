module.exports = app => {
    require("./authRoutes")(app);
    require("./getUserIcon")(app);
    require("./course")(app);
    require("./article")(app);
    require("./admin")(app);
    require("./settings")(app);
};