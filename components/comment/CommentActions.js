import axios from "axios";
import getRouteString from "../../utils/getRouteString";

import keys from "../../config/keys";

export const COMMENT_SUCCESS = "COMMENT_SUCCESS";
export const COMMENT_FAILURE = "COMMENT_FAILURE";
export const DELETE_COMMENT_SUCCESS = "DELETE_ARTICLE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_ARTICLE_COMMENT_FAILURE";
export const CLEAR_COMMENT = "CLEAR_COMMENT";
export const RESET_COMMENT_ADDED = "RESET_COMMENT_ADDED";

export const newArticleComment = (articleID, comment) => async dispatch => {
    try {
        await axios.post("/api/new-article-comment", { articleID, comment });

        dispatch({ type: COMMENT_SUCCESS, payload: { commentAdded: true } });
        dispatch(fetchArticlesComments(articleID)); 
    }
    catch (err) {
        dispatch({ type: COMMENT_FAILURE, payload: err.response.data.error });
    }
};

export const newArticleReply = (articleID, commentID, comment) => async dispatch => {
    try {
        await axios.post("/api/new-article-comment-reply", { commentID, comment });

        dispatch({ type: COMMENT_SUCCESS, payload: { replyAdded: true } });
        dispatch(fetchArticlesComments(articleID));
    }
    catch (err) {
        dispatch({ type: COMMENT_FAILURE, payload: err.response.data.error });
    }
};

export const fetchArticlesComments = (articleID, req) => async dispatch => {
    try {
        const res = await axios.post(getRouteString("/api/get-articles-comments", req), { articleID });

        let comments = sortCommentsAndReplies(res.data.comments);

        dispatch({ type: COMMENT_SUCCESS, payload: { error: null, articleComments: comments } });
    }
    catch(err) {
        dispatch({ type: COMMENT_FAILURE, payload: err });
    }
};

export const deleteArticlesComment = (commentID, articleID) => async dispatch => {
    try {
        await axios.post("/api/delete-articles-comment", { commentID });
        
        dispatch(fetchArticlesComments(articleID));   
    } 
    catch(err) {
        dispatch({ type: COMMENT_FAILURE, payload: err.response.data.error });
    }
};

export const deleteArticlesCommentReply = (replyID, articleID) => async dispatch => {
    try {
        await axios.post("/api/delete-articles-comment-reply", { replyID });

        dispatch(fetchArticlesComments(articleID));
    }
    catch (err) {
        dispatch({ type: COMMENT_FAILURE, payload: err.response.data.error });
    }
};

export const newCoursePartComment = (partID, comment) => async dispatch => {
    try {
        await axios.post("/api/new-course-part-comment", { partID, comment });

        dispatch({ type: COMMENT_SUCCESS, payload: { commentAdded: true } });
        dispatch(fetchCoursePartComments(partID));
    }
    catch(err) {
        dispatch({ type: COMMENT_FAILURE, payload: err.response.data.error });
    }
};

export const newCourseseReply = (partID, commentID, comment) => async dispatch => {
    try {
        await axios.post("/api/new-courses-comment-reply", { commentID, comment });

        dispatch({ type: COMMENT_SUCCESS, payload: { replyAdded: true } });
        dispatch(fetchCoursePartComments(partID));
    }
    catch (err) {
        dispatch({ type: COMMENT_FAILURE, payload: err.response.data.error });
    }
};

export const fetchCoursePartComments = (partID, req) => async dispatch => {
    try {
        const res = await axios.post(getRouteString("/api/get-course-part-comments", req), { partID });

        let comments = sortCommentsAndReplies(res.data.comments);

        dispatch({ type: COMMENT_SUCCESS, payload: { error: null, coursePartComments: comments } });
    }
    catch(err) {
        dispatch({ type: COMMENT_FAILURE, payload: err.response.data.error });
    }
};

export const deleteCoursePartComment = (commentID, partID) => async dispatch => {
    try {
        await axios.post("/api/delete-course-part-comment", { commentID });

        dispatch(fetchCoursePartComments(partID));
    }
    catch(err) {
        dispatch({ type: COMMENT_FAILURE, payload: err.response.data.error });
    }
};

export const deleteCoursesCommentReply = (replyID, partID) => async dispatch => {
    try {
        await axios.post("/api/delete-courses-comment-reply", { replyID });

        dispatch(fetchCoursePartComments(partID));
    }
    catch (err) {
        dispatch({ type: COMMENT_FAILURE, payload: err.response.data.error });
    }
};

export const clearComment = () => dispatch => {
    dispatch({ type: CLEAR_COMMENT });
};

function sortCommentsAndReplies(commentsData) {
    let comments = [];

    commentsData.forEach((comment) => {
        let alreadyInCommentsArray = false;

        const newReply = {
            id: comment.reply_id,
            comment: comment.reply,
            forename: comment.replier_forename,
            surname: comment.replier_surname,
            upvotes: comment.reply_upvotes,
            timestamp: comment.reply_timestamp,
            oauthID: comment.replier_oauthID
        }

        comments.forEach((existingComment) => {
            if (comment.id === existingComment.id) {
                alreadyInCommentsArray = true;
                existingComment.replies.push(newReply);
            }
        })

        if (!alreadyInCommentsArray) {
            let newCommment

            //if this new comment has replies add a replies key to it
            if (comment.reply_id != null) {
                newCommment = { ...comment, ...{ replies: [newReply] } }; //add an empty array with key replies if this is a new comment
                //remove replies from main comment since they are now in a replies array
                delete newCommment.reply_id
                delete newCommment.reply
                delete newCommment.replier_forename
                delete newCommment.replier_surname
                delete newCommment.reply_upvotes
                delete newCommment.reply_timestamp
                delete newCommment.replier_oauthID
            }
            //doesnt have replies so just add comment and delete all reply keys because they are null
            else {
                newCommment = comment;
                delete newCommment.reply_id
                delete newCommment.reply
                delete newCommment.replier_forename
                delete newCommment.replier_surname
                delete newCommment.reply_upvotes
                delete newCommment.reply_timestamp
                delete newCommment.replier_oauthID
            }

            comments.push(newCommment);
        }
    })

    return comments;
}