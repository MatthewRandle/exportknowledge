const passport = require("passport");

module.exports = app => {
    app.get("/auth/github", passport.authenticate("github",
        {
            scope: ["user:email"],
        })
    );

    app.get("/auth/github/callback", passport.authenticate("github", { failureRedirect: "/" }), (req, res) => {
        res.redirect("/");
    }
    );

    app.get("/api/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    app.post("/api/current_user", (req, res) => {
        if (req.body.user != null) {
            res.send({ id: req.body.user });
        }
        else {
            res.send({ id: false });
        }    
    });    
};