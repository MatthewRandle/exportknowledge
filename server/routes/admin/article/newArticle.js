const pool = require("../../../services/db");
const adminCheck = require("../../../middleware/adminCheck");
const bodyCheck = require("../../../middleware/bodyCheck");

const newArticle = `
    INSERT INTO articles
    (title, image, text, text_preview, video, timestamp, url, articles.exists)
    VALUES (?, ?, ?, ?, ?, NOW(), ?, ?);`

module.exports = app => {
    app.post("/api/admin/new-article", bodyCheck, adminCheck, (req, res, next) => {
        if (req.body.title == null || 
            req.body.image == null || 
            req.body.text == null || 
            req.body.url == null || 
            req.body.tags == null || 
            req.body.tags.length === 0 || 
            req.body.exists == null) 
        {
            res.send({ error: "No Body" });
            return;
        }

        pool.getConnection((err, connection) => {
            if (err) {
                next(err);
                return;
            }

            connection.beginTransaction((err) => {
                if(err) {
                    connection.release();
                    next(err);
                    return;
                }

                const text_preview = req.body.text.substring(0, 274);

                //insert new article
                connection.query(newArticle, [req.body.title, req.body.image, req.body.text, text_preview, req.body.video, req.body.url, req.body.exists], (err, results) => {
                    if (err) {
                        return connection.rollback(function () {
                            connection.release();
                            next(err);
                            return;
                        });                        
                    }

                    const articleID = results.insertId;

                    const { tagsQuery, escapedTagsValues } = generateTagsQuery(req.body.tags, articleID);

                    connection.query(tagsQuery, escapedTagsValues, (err) => {
                        if (err) {
                            return connection.rollback(function () {
                                connection.release();
                                next(err);
                                return;
                            }); 
                        }

                        //if new article has prerequisites add them
                        if (req.body.prerequisites.length > 0) {
                            const { prerequisitesQuery, escapedPrerequisitesValues } = generatePrerequisitesQuery(req.body.prerequisites, articleID);

                            //INSERT ALL PREREQUISITES INTO articles_prerequisites table
                            connection.query(prerequisitesQuery, escapedPrerequisitesValues, (err) => {
                                if (err) {
                                    return connection.rollback(function () {
                                        connection.release();
                                        next(err);
                                        return;
                                    });
                                }

                                connection.commit((err) => {
                                    if (err) {
                                        return connection.rollback(function () {
                                            connection.release();
                                            next(err);
                                            return;
                                        });
                                    }

                                    connection.release();
                                    res.end();
                                }) 
                            });                             
                        }
                        //else just end transaction
                        else {
                            connection.commit((err) => {
                                if (err) {
                                    return connection.rollback(function () {
                                        connection.release();
                                        next(err);
                                        return;
                                    });
                                }

                                connection.release();
                                res.end();
                            })  
                        }                         
                    });                 
                });
            })
        });
    });
};

function generateTagsQuery(tags, lastInsertID) {
    let escapedTagsValues = [];
    let tagsQuery = "";

    const insertTagsQuery = `
        INSERT INTO articles_tags
            (articles_id, tags_id)
            VALUES (?, ?);`

    //generate inserts for all tags and append values to escapedValues array
    for(let i = 0; i < tags.length; i++) {
        tagsQuery += insertTagsQuery;
        escapedTagsValues.push(lastInsertID);
        escapedTagsValues.push(tags[i].value);
    }

    console.log(tagsQuery)
    return { tagsQuery, escapedTagsValues };
}

function generatePrerequisitesQuery(prerequisites, lastInsertID) {
    let escapedPrerequisitesValues = [];
    let prerequisitesQuery = "";

    const insertPrerequisitesQuery = `
        INSERT INTO articles_prerequisites
            (articles_id, prerequisites_id)
            VALUES (?, ?);`

    //generate inserts for all tags and append values to escapedValues array
    for (let i = 0; i < prerequisites.length; i++) {
        prerequisitesQuery += insertPrerequisitesQuery;
        escapedPrerequisitesValues.push(lastInsertID);
        escapedPrerequisitesValues.push(prerequisites[i].value);
    }

    return { prerequisitesQuery, escapedPrerequisitesValues };
}