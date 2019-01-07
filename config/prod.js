//prod.js - production keys
module.exports = {
    cookieKey: process.env.COOKIE_KEY,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    databaseHost: process.env.DATABASE_HOST,
    databaseUser: process.env.DATABASE_USER,
    databasePassword: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    TMDBKey: process.env.TMDB
};