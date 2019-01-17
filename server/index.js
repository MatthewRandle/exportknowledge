const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const xFrameOptions = require("x-frame-options");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const keys = require("../config/keys");
const path = require("path");

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev });
const handle = app.getRequestHandler();
const PORT = parseInt(process.env.PORT, 10) || 3000;

const commentLimiter = new RateLimit({
    windowMs: 30 * 1000, //30 seconds
    max: 3,
    delayMs: 0
});

const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 900,
    delayMs: 0
});

app.prepare()
    .then(() => {
        require("./services/passport-github");  

        const server = express();

        server.use(helmet());
        
        if (process.env.NODE_ENV === "production") {
            server.use("/api/", limiter);
            server.use("/api/new-article-comment", commentLimiter);
            server.use("/api/new-course-comment", commentLimiter);
        }

        server.use(
            cookieSession({
                maxAge: 30 * 24 * 60 * 60 * 1000,
                keys: [keys.cookieKey],
                sameSite: "lax",
                //secure: true  TODO: Add when on https
            })
        );
        server.use(passport.initialize());
        server.use(passport.session());
        server.use(xFrameOptions());
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(bodyParser.json());

        require("./routes")(server);

        server.get('/robots.txt', (req, res) => {
            res.sendFile(path.join(__dirname, '../static', 'robots.txt'))
        })

        server.get('/sitemap.xml', (req, res) => {
            res.sendFile(path.join(__dirname, '../static', 'sitemap.xml'))
        })

        server.get('/article/:url', (req, res) => {
            const actualPage = '/article';
            const queryParams = { url: req.params.url };
            app.render(req, res, actualPage, queryParams);
        })

        server.get('/course/:url', (req, res) => {
            const actualPage = '/course';
            const queryParams = { url: req.params.url };
            app.render(req, res, actualPage, queryParams);
        })

        server.get('/course/:courseURL/:partURL', (req, res) => {
            const actualPage = '/course/part';
            const queryParams = { courseURL: req.params.courseURL, partURL: req.params.partURL };
            app.render(req, res, actualPage, queryParams);
        })

        server.get('/admin/edit/article/:url', (req, res) => {
            const actualPage = '/admin/edit/article';
            const queryParams = { url: req.params.url };
            app.render(req, res, actualPage, queryParams);
        })

        server.get('/admin/edit/course/:url', (req, res) => {
            const actualPage = '/admin/edit/course';
            const queryParams = { url: req.params.url };
            app.render(req, res, actualPage, queryParams);
        })

        server.get('/admin/edit/course/:courseUrl/:partUrl', (req, res) => {
            const actualPage = '/admin/edit/course/part';
            const queryParams = { courseUrl: req.params.courseUrl, partUrl: req.params.partUrl };
            app.render(req, res, actualPage, queryParams);
        })

        server.get('/admin/new/:courseUrl/part', (req, res) => {
            const actualPage = '/admin/new/course/part';
            const queryParams = { courseUrl: req.params.courseUrl };
            app.render(req, res, actualPage, queryParams);
        })

        server.get('*', (req, res) => {
            return handle(req, res); // for all the react stuff
        })

        server.listen(PORT, err => {
            if (err) throw err;
            console.log(`ready at http://localhost:${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    }); 