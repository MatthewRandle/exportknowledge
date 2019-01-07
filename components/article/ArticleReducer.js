import { FETCH_ARTICLE, FETCH_ALL_ARTICLES, FETCH_ALL_TAGS, CLEAR_ARTICLE } from "./ArticleActions";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_ARTICLE:
            return {...state, ...action.payload};
        case FETCH_ALL_ARTICLES:
            return { ...state, ...action.payload };
        case FETCH_ALL_TAGS:
            return { ...state, ...action.payload };
        case CLEAR_ARTICLE:
            return { ...state, ...{ selectedArticle: null, selectedArticlesFurtherReading: null, selectedArticlesPrerequisites: null } };
        default:
            return state;
    }
}