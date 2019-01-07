module.exports = app => {
    require("./getUserSettings")(app);
    require("./updateUserSettings")(app);
}