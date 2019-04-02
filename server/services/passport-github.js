const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;
const keys = require("../../config/keys");
const pool = require("./db");

const checkUserExists = `
    SELECT forename, surname, email, users.id
    FROM users
        JOIN users_settings ON users.users_settings_id = users_settings.id
    WHERE oauthID = ?
    LIMIT 1;
`;

const newUserSettings = `
    INSERT INTO users_settings (forename, surname, email, profile_picture) 
        VALUES (?, ?, ?, ?);`;

const newUser = `
     INSERT INTO users (oauthID, users_settings_id)
        VALUES (?, ?);`;

const editUser = `
    UPDATE users_settings
        SET forename = ?,
        surname = ?,
        email = ?,
        profile_picture = ?
    WHERE users_settings.id = (
        SELECT users.users_settings_id
        FROM users
        WHERE users.oauthID = ?
    );`;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    pool.query("SELECT * FROM users WHERE oauthID = ?", [ id ], (err, results) => {
        if(err) {
            done(err, false);
            return;
        }
        
        if(results.length === 0) {
            done(null, false);
        }
        else {
            done(null, results[0].oauthID);
        }
    })
});

passport.use(
    new GitHubStrategy(
        {
            clientID: keys.githubClientID,
            clientSecret: keys.githubClientSecret,
            callbackURL: "/auth/github/callback",
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            var forename;
            var surname;

            if(profile._json.name != null) {
                forename = profile._json.name.substring(0, profile._json.name.indexOf(" ")) || null;
                surname = profile._json.name.split(" ").splice(-1)[0] || null;
            }
            else {
                forename = null;
                surname = null;
            }

            var email = profile._json.email || null;
            var profilePicture = profile.photos[0].value || null;

            pool.getConnection((err, connection) => {
                if (err) {
                    done(null, false, { message: "Cant connect to database" });
                    return;
                }

                connection.beginTransaction((err) => {
                    if (err) {
                        connection.release();
                        done(null, false);
                        return;
                    }
                
                    //Check if user exists
                    connection.query(checkUserExists, [profile.id], (err, results) => {
                        if (err) {
                            return connection.rollback(function () {
                                connection.release();
                                done(null, false);
                                return;
                            });
                        }

                        //if the user doesn't exist, make a new record
                        if (results.length === 0) {
                            connection.query(newUserSettings, [forename, surname, email, profilePicture], (err, results) => {
                                if (err) {
                                    return connection.rollback(function () {
                                        connection.release();
                                        done(null, false);
                                        return;
                                    });
                                }
                                
                                connection.query(newUser, [profile.id, results.insertId], (err, results) => {                                    
                                    if (err) {
                                        return connection.rollback(function () {
                                            connection.release();
                                            done(null, false);
                                            return;
                                        });
                                    }

                                    console.log(results);
                                
                                    connection.commit((err) => {
                                        if (err) {
                                            return connection.rollback(function () {
                                                connection.release();
                                                done(null, false);
                                                return;
                                            });
                                        }

                                        connection.release();
                                        done(null, profile.id);
                                    });
                                });
                            });
                        }
                        else {
                            //if user has changed name or email on github, update on our end
                            if (results[0].forename !== forename || results[0].surname !== surname || results[0].email != email || results[0].profile_picture != profilePicture) {
                                const newForename = forename || results[0].forename;
                                const newSurname = surname || results[0].surname;
                                const newEmail  = email || results[0].email;
                                const newProfilePicture = profilePicture || results[0].profile_picture;

                                connection.query(editUser, [newForename, newSurname, newEmail, newProfilePicture, profile.id], (err, results) => {
                                    if (err) {
                                        return connection.rollback(function () {
                                            connection.release();
                                            done(null, false);
                                            return;
                                        });
                                    }

                                    connection.commit((err) => {
                                        if (err) {
                                            console.log(err)
                                            return connection.rollback(function () {
                                                connection.release();
                                                done(null, false);
                                                return;
                                            });
                                        }
                                        console.log("DONE")

                                        connection.release();
                                        done(null, profile.id);
                                    });
                                });
                            }
                            else {
                                connection.commit((err) => {
                                    if (err) {
                                        return connection.rollback(function () {
                                            connection.release();
                                            done(null, false);
                                            return;
                                        });
                                    }
                                    connection.release();
                                    done(null, profile.id);
                                });
                            }                        
                        }
                    });
                });                
            });
        }
    )
);