import {    NEW_ARTICLE_ERROR, 
            NEW_ARTICLE_SUCCESS, 
            IS_ADMIN, 
            FETCH_ALL_ARTICLES_ADMIN, 
            RESET_ADMIN, 
            FETCH_ARTICLE_ADMIN, 
            ADMIN_ERROR, 
            FETCH_ALL_COURSES_ADMIN,
            NEW_COURSE_ERROR,
            NEW_COURSE_SUCCESS } from "./AdminActions";
 
export default function (state = null, action) {
    switch (action.type) {
        case NEW_ARTICLE_ERROR:
            return { ...state, ...action.payload };
        case NEW_ARTICLE_SUCCESS:
            return { ...state, ...action.payload };
        case NEW_COURSE_ERROR:
            return { ...state, ...action.payload };
        case NEW_COURSE_SUCCESS:
            return { ...state, ...action.payload };
        case IS_ADMIN:
            return {...state, ...action.payload};
        case FETCH_ALL_ARTICLES_ADMIN:
            return { ...state, ...action.payload };
        case FETCH_ALL_COURSES_ADMIN:
            return {...state, ...action.payload};
        case RESET_ADMIN:
            return {...state, ...action.payload};
        case FETCH_ARTICLE_ADMIN:
            return {...state, ...action.payload};
        case ADMIN_ERROR:
            return {...state, ...action.payload};
        default:
            return state;
    }
}