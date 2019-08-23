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
        req.session = null;        
        res.redirect("/");
    });

    app.post("/api/current_user", (req, res) => {
        console.log("CURRENT: " + req.user)
        if(req.user != null) {
            res.send({ id: req.user });
            res.end();
        }
        else {
            res.send({ id: false });
            res.end();
        }
    });
};