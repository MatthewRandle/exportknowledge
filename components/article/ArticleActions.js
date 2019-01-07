import axios from "axios";

import getRouteString from "../../utils/getRouteString";
import errorHandler from "../../utils/actionErrorHandler";
import keys from "../../config/keys";

export const FETCH_ARTICLE = "FETCH_ARTICLE";
export const FETCH_ALL_ARTICLES = "FETCH_ALL_ARTICLES";
export const FETCH_ALL_TAGS = "FETCH_ALL_TAGS";
export const FETCH_ARTICLES_PREREQUISITES = "FETCH_ARTICLES_PREREQUISITES";
export const CLEAR_ARTICLE = "CLEAR_ARTICLE";
export const FETCH_RECOMMENDED = "FETCH_RECOMMENDED";

export const fetchArticle = (url, req) => async dispatch => {
    try {
        const res = await axios.post(getRouteString("/api/get-article", req), { url });

        dispatch({
            type: FETCH_ARTICLE,
            payload: {
                selectedArticle: res.data.article,
                selectedArticlesPrerequisites: res.data.prerequisites,
                selectedArticlesFurtherReading: res.data.furtherReading
            }
        }); 
    } 
    catch(err) {
        dispatch(errorHandler(err));
    }
};

export const fetchAllArticles = (req) => async dispatch => {
    try {
        const res = await axios.get(getRouteString("/api/get-all-articles", req));

        let articles = [];

        //sort tags so they are an array instead of showing multiple of the same article when more than 1 tag
        res.data.allArticles.forEach((item) => {
            let alreadyInArticle = false; //used to check if needs to be added to articles array or not

            articles.forEach((article) => {
                //if the tags on this articles is not an array make it one
                if (article.tags.constructor !== Array) {
                    article.tags = [article.tags];
                }

                //if the new articles exists in articles array
                if (article.id === item.id) {
                    alreadyInArticle = true;

                    //push duplicate articles tags in the article
                    article.tags.push(item.tags)
                }
            })

            //new articles isnt in articles array so add it
            if (!alreadyInArticle) {
                articles.push(item);
            }
        })

        dispatch({ type: FETCH_ALL_ARTICLES, payload: { all: articles } });
    }
    catch (err) {
        dispatch(errorHandler(err));
    }
};

export const fetchAllTags = (req) => async dispatch => {
    try {
        const res = await axios.get(getRouteString("/api/get-all-tags", req));

        dispatch({ type: FETCH_ALL_TAGS, payload: { tags: res.data.tags } });
    }
    catch (err) {
        dispatch(errorHandler(err));
    }
};

export const clearArticle = () => dispatch => {
    dispatch({ type: CLEAR_ARTICLE });
};