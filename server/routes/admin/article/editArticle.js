const pool = require("../../../services/db");
const AppError = require("../../../tools/applicationError");
const adminCheck = require("../../../middleware/adminCheck");
const bodyCheck = require("../../../middleware/bodyCheck");

const editArticle = `
    UPDATE articles
        SET url = ?,
        title = ?,
        image = ?,
        text = ?,
        text_preview = ?,
        video = ?,
        articles.exists = ?
    WHERE id = ?;`

const deleteArticlesTags = `
    DELETE FROM articles_tags
    WHERE articles_id = ?;`

const deleteArticlesPrerequisites = `
    DELETE FROM articles_prerequisites
    WHERE articles_id = ?;`

module.exports = app => {  
    app.post("/api/admin/edit-article", bodyCheck, adminCheck, (req, res, next) => {
        if (req.body.id     == null || 
            req.body.title  == null || 
            req.body.image  == null || 
            req.body.text   == null || 
            req.body.url    == null ||
            req.body.tags   == null ||
            req.body.exists == null) 
        {
            res.send({ error: "No Body" });
            return;
        }

        pool.getConnection((err, connection) => {
            if (err) {
                next(new AppError(err));
                return;
            }

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    next(new AppError(err));
                    return;
                }

                const firstParagraph = req.body.text.indexOf("<");
                let text_preview;

                if(firstParagraph > 274) {
                    text_preview = req.body.text.substring(0, 274).trim();
                }
                else {
                    text_preview = req.body.text.substring(0, firstParagraph).trim();
                }

                

                //EDIT ARTICLE
                connection.query(editArticle, [req.body.url, req.body.title, req.body.image, req.body.text, text_preview, req.body.video, req.body.exists, req.body.id], (err, results) => {
                    if (err) {
                        return connection.rollback(function () {
                            connection.release();
                            next(new AppError(err));
                            return;
                        }); 
                    }

                    //DELETE TAGS
                    connection.query(deleteArticlesTags, [req.body.id], (err) => {
                        if (err) {
                            return connection.rollback(function () {
                                connection.release();
                                next(new AppError(err));
                                return;
                            });
                        }

                        const { tagsQuery, escapedTagsValues } = generateTagsQuery(req.body.tags, req.body.id);

                        //INSERT NEW TAGS
                        connection.query(tagsQuery, escapedTagsValues, (err, results) => {
                            if (err) {
                                return connection.rollback(function () {
                                    connection.release();
                                    next(new AppError(err));
                                    return;
                                });
                            }

                            //DELETE ARTICLES PREREQUISITES
                            connection.query(deleteArticlesPrerequisites, [req.body.id], (err, results) => {
                                if (err) {
                                    return connection.rollback(function () {
                                        connection.release();
                                        next(new AppError(err));
                                        return;
                                    });
                                }

                                //IF EDITED ARTICLE HAS PREREQUISITES INSERT THEM
                                if(req.body.prerequisites.length > 0) {
                                    const { prerequisitesQuery, escapedPrerequisitesValues } = generatePrerequisitesQuery(req.body.prerequisites, req.body.id);

                                    connection.query(prerequisitesQuery, escapedPrerequisitesValues, (err, results) => {
                                        if (err) {
                                            return connection.rollback(function () {
                                                connection.release();
                                                next(new AppError(err));
                                                return;
                                            });
                                        }

                                        connection.commit((err) => {
                                            if (err) {
                                                return connection.rollback(function () {
                                                    connection.release();
                                                    next(new AppError(err));
                                                    return;
                                                });
                                            }

                                            connection.release();
                                            res.end();
                                        }) 
                                    });
                                }
                                else {
                                    connection.commit((err) => {
                                        if (err) {
                                            return connection.rollback(function () {
                                                connection.release();
                                                next(new AppError(err));
                                                return;
                                            });
                                        }

                                        connection.release();
                                        res.end();
                                    }) 
                                }
                            });
                        })
                    });
                });
            });
        });
    });
}

function generateTagsQuery(tags, articleID) {
    let escapedTagsValues = [];
    let tagsQuery = "";

    const insertTagsQuery = `
        INSERT INTO articles_tags
            (articles_id, tags_id)
            VALUES (?, ?);
    `;

    //generate inserts for all tags and append values to escapedValues array
    for (let i = 0; i < tags.length; i++) {
        tagsQuery += insertTagsQuery;
        escapedTagsValues.push(articleID);
        escapedTagsValues.push(tags[i].value);
    }

    return { tagsQuery, escapedTagsValues };
}

function generatePrerequisitesQuery(prerequisites, articleID) {
    let escapedPrerequisitesValues = [];
    let prerequisitesQuery = "";

    const insertPrerequisitesQuery = `
        INSERT INTO articles_prerequisites
            (articles_id, prerequisites_id)
            VALUES (?, ?);`

    //generate inserts for all tags and append values to escapedValues array
    for (let i = 0; i < prerequisites.length; i++) {
        prerequisitesQuery += insertPrerequisitesQuery;
        escapedPrerequisitesValues.push(articleID);
        escapedPrerequisitesValues.push(prerequisites[i].value);
    }

    return { prerequisitesQuery, escapedPrerequisitesValues };
}