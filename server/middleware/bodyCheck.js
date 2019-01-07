module.exports = (req, res, next) => {
    if (!req.body) {
        res.send({ error: "No Body" });
        return;
    }
    else {
        next();
    }
};