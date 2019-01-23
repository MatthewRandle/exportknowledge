import React from "react";
import dynamic from "next/dynamic";

import "../stylesheets/css/Article.css";
import "../stylesheets/css/Code.css";
import "../stylesheets/css/CommentSection.css";

import ErrorBoundary from "../components/ErrorBoundary";
import initialSetupFetch from "../utils/initialSetupFetch";
import { fetchArticle } from "../components/article/ArticleActions";
import ArticleLoader from "../components/article/ArticleLoader";

const Article = dynamic(import("../components/article"), { loading: () => <ArticleLoader /> });

const ArticlePage = () => {
    return(
        <ErrorBoundary>   
            <Article />
        </ErrorBoundary>
    );
}

ArticlePage.getInitialProps = async function ({ store, req, query, asPath }) {
    //if server side
    if(req) {
        await initialSetupFetch(store, req);
    }

    const state = store.getState();    
    
    if(state.article == null) {
        await store.dispatch(fetchArticle(query.url, req));
    }
    else if(state.article.selectedArticle == null) {
        await store.dispatch(fetchArticle(query.url, req));
    }

    return {};
}

export default ArticlePage;