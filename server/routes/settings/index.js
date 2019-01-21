module.exports = app => {
    require("./getUserSettings")(app);
    require("./updateUserSettings")(app);
    require("./deleteAccount")(app);
}