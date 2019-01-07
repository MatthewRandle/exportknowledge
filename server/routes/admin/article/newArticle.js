const pool = require("../../../services/db");
const AppError = require("../../../tools/applicationError");
const adminCheck = require("../../../middleware/adminCheck");
const bodyCheck = require("../../../middleware/bodyCheck");

const newArticle = `
    INSERT INTO articles
    (title, image, text, video, timestamp, url, articles.exists, description)
    VALUES (?, ?, ? , ? , NOW() , ?, ?, ?);`

module.exports = app => {
    app.post("/api/admin/new-article", bodyCheck, adminCheck, (req, res, next) => {
        if (typeof req.body.title == null || 
            typeof req.body.image == null || 
            typeof req.body.text == null || 
            typeof req.body.url == null || 
            typeof req.body.tags == null || 
            req.body.tags.length === 0 || 
            typeof req.body.exists == null) 
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
                if(err) {
                    connection.release();
                    next(new AppError(err));
                    return;
                }

                //insert new article
                connection.query(newArticle, [req.body.title, req.body.image, req.body.text, req.body.video, req.body.url, req.body.exists, req.body.description], (err, results) => {
                    if (err) {
                        return connection.rollback(function () {
                            connection.release();
                            next(new AppError(err));
                            return;
                        });                        
                    }

                    const articleID = results.insertId;

                    const { tagsQuery, escapedTagsValues } = generateTagsQuery(req.body.tags, articleID);

                    connection.query(tagsQuery, escapedTagsValues, (err) => {
                        if (err) {
                            return connection.rollback(function () {
                                connection.release();
                                next(new AppError(err));
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
                        //else just end transaction
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