import axios from "axios";
import getRouteString from "../../utils/getRouteString";

export const ERROR = "ERROR";
export const NEW_ARTICLE_SUCCESS = "NEW_ARTICLE_SUCCESS";
export const NEW_ARTICLE_ERROR = "NEW_ARTICLE_ERROR";
export const EDIT_ARTICLE_SUCCESS = "EDIT_ARTICLE_SUCCESS";
export const EDIT_ARTICLE_ERROR = "EDIT_ARTICLE_ERROR";
export const IS_ADMIN = "IS_ADMIN";
export const FETCH_ALL_ARTICLES_ADMIN = "FETCH_ALL_ARTICLES_ADMIN";
export const RESET_ADMIN = "RESET_ADMIN";
export const FETCH_ARTICLE_ADMIN = "FETCH_ARTICLE_ADMIN";
export const ADMIN_ERROR = "ADMIN_ERROR";
export const FETCH_ALL_COURSES_ADMIN = "FETCH_ALL_COURSES_ADMIN";
export const NEW_COURSE_ERROR = "NEW_COURSE_ERROR";
export const NEW_COURSE_SUCCESS = "NEW_COURSE_SUCCESS";

//We have a fetchArticle for admin because if any of the res's return an error we still want to pass what we got so we can edit it, example no prerequistes
export const fetchArticle = (url, req) => async dispatch => {
    const articleRes = await axios.post(getRouteString("/api/get-article", req), { url });
    const tagRes = await axios.post(getRouteString("/api/get-articles-tags", req), { id: articleRes.data.article.id });
    const prerequisiteRes = await axios.post(getRouteString("/api/admin/get-articles-prerequisites", req), { id: articleRes.data.article.id });

    if (articleRes.data.error) {
        dispatch({ type: ADMIN_ERROR, payload: articleRes.data.error });
    }
    else if (tagRes.data.error) {
        dispatch({ type: ADMIN_ERROR, payload: tagRes.data.error });
    }
    else if (prerequisiteRes.data.error) {
        dispatch({ type: ADMIN_ERROR, payload: prerequisiteRes.data.error });
    }

    dispatch({ type: FETCH_ARTICLE_ADMIN, payload: { selectedArticle: articleRes.data.article, selectedArticlesTags: tagRes.data.tags, selectedArticlesPrerequisites: prerequisiteRes.data.prerequisites } });
};

export const newArticle = (url, title, image, text, video, tags, exists, prerequisites, description) => async dispatch => {
    const res = await axios.post("/api/admin/new-article", { url, title, image, text, video, tags, exists, prerequisites, description });

    if(res.data.error) {
        dispatch({ type: NEW_ARTICLE_ERROR, payload: { error: res.data.error, success: false, articleAdded: false } });
    }    
    else {
        dispatch({ type: NEW_ARTICLE_SUCCESS, payload: { error: null, success: true, articleAdded: false }});
    }
};

export const newCourse = (url, title, image, preview, video, exists, description, category, whatLearn, whoFor, prerequisites) => async dispatch => {
    const res = await axios.post("/api/admin/new-course", { url, title, image, preview, video, exists, description, category, whatLearn, whoFor, prerequisites });

    if (res.data.error) {
        dispatch({ type: NEW_COURSE_ERROR, payload: { error: res.data.error, success: false, courseAdded: false } });
    }
    else {
        dispatch({ type: NEW_COURSE_SUCCESS, payload: { error: null, success: true, courseAdded: false } });
    }
};

export const newCoursePart = (courseURL, title, video, description, url, text, length, exists) => async dispatch => {
    const res = await axios.post("/api/admin/new-course-part", { courseURL, title, video, description, url, text, length, exists });

    if (res.data.error) {
        dispatch({ type: NEW_COURSE_ERROR, payload: { error: res.data.error, success: false, courseAdded: false } });
    }
    else {
        dispatch({ type: NEW_COURSE_SUCCESS, payload: { error: null, success: true, courseAdded: false } });
    }
};

export const editCoursesPart = (courseURL, partURL, title, video, description, url, text, length, part, exists) => async dispatch => {
    const res = await axios.post("/api/admin/edit-course-part", { courseURL, partURL, title, video, description, url, text, length, part, exists });

    if (res.data.error) {
        dispatch({ type: NEW_COURSE_ERROR, payload: { error: res.data.error, success: false, coursePartAdded: false } });
    }
    else {
        dispatch({ type: NEW_COURSE_SUCCESS, payload: { error: null, success: true, coursePartAdded: false } });
    }
};

export const editArticle = (id, url, title, image, text, video, tags, exists, prerequisites, description) => async dispatch => {
    const editArticleRes = await axios.post("/api/admin/edit-article", { id, url, title, image, text, video, exists, prerequisites, tags, description });

    if (editArticleRes.data.error) {
        dispatch({ type: NEW_ARTICLE_ERROR, payload: { error: editArticleRes.data.error, success: false, articleAdded: false } });
    }
    else {
        dispatch({ type: NEW_ARTICLE_SUCCESS, payload: { error: null, success: true, articleAdded: true } });
    }
};

export const editCourse = (id, url, title, image, preview, video, exists, description, category, whatLearn, whoFor, prerequisites) => async dispatch => {
    const editCourseRes = await axios.post("/api/admin/edit-course", { id, url, title, image, preview, video, exists, description, category, whatLearn, whoFor, prerequisites });

    if (editCourseRes.data.error) {
        dispatch({ type: NEW_COURSE_ERROR, payload: { error: editCourseRes.data.error, success: false, courseAdded: false } });
    }
    else {
        dispatch({ type: NEW_COURSE_SUCCESS, payload: { error: null, success: true, courseAdded: true } });
    }
};


export const isAdmin = (req) =>  async dispatch => {
    try {
        const res = await axios.post(getRouteString("/api/admin/check-admin", req), { user: req ? req.user : null });

        if (res.data.authorised === true) {
            dispatch({ type: IS_ADMIN, payload: { authorised: true } });
        }
        else {
            dispatch({ type: IS_ADMIN, payload: { authorised: false } })
        }
    }
    catch(err) {
        dispatch({ type: IS_ADMIN, payload: { authorised: false } })
    }
};

export const fetchAllArticles = (req) => async dispatch => {
    const res = await axios.get(getRouteString("/api/admin/get-all-articles", req), { user: req ? req.user : null });   

    dispatch({ type: FETCH_ALL_ARTICLES_ADMIN, payload: { allArticles: res.data.allArticles } });
};

export const deleteArticle = (id) => async dispatch => {
    const commentRes = await axios.post("/api/admin/delete-all-articles-comments", { articleID: id });

    if(commentRes.data.error) {
        dispatch({ type: ERROR, payload: { error: res.data.error } });
        return;
    }

    const res = await axios.post("/api/admin/delete-article", { id });

    if(res.data.error) {
        dispatch({ type: ERROR, payload: { error: res.data.error } });
    }
};

export const deleteCourse = (id) => async dispatch => {
    const res = await axios.post("/api/admin/delete-course", { id });

    if (res.data.error) {
        dispatch({ type: ERROR, payload: { error: res.data.error } });
    }
};

export const deleteCoursePart = (id) => async dispatch => {
    const commentRes = await axios.post("/api/admin/delete-all-courses-parts-comments", { partID: id })

    if(commentRes.data.error) {
        dispatch({ type: ERROR, payload: { error: res.data.error } });
        return;
    }

    const res = await axios.post("/api/admin/delete-course-part", { id });

    if (res.data.error) {
        dispatch({ type: ERROR, payload: { error: res.data.error } });
    }
};

export const clearSuccess = () => dispatch => {
    dispatch({ type: NEW_ARTICLE_SUCCESS, payload: { error: null, success: false, courseAdded: false } });
};

export const reset = () => dispatch => {
    dispatch({ type: RESET_ADMIN, payload: { error: null, success: false, articleAdded: false } });
};

export const fetchAllCourses = (req) => async dispatch => {
    const res = await axios.get(getRouteString("/api/admin/get-all-courses", req));

    if (res.data.error) {
        dispatch({ type: ERROR, payload: "Could not retrive courses." })
        return;
    }

    dispatch({ type: FETCH_ALL_COURSES_ADMIN, payload: { allCourses: res.data.courses } });
};
