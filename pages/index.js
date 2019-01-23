import React from "react";
import dynamic from "next/dynamic";

import "../stylesheets/css/ArticlePanel.css";
import "../stylesheets/css/ArticleSearch.css";
import "../stylesheets/css/Home.css";

import ErrorBoundary from "../components/ErrorBoundary";
import initialSetupFetch from "../utils/initialSetupFetch";
import HomeLoader from "../components/home/HomeLoader";
import { fetchAllTags, fetchAllArticles } from "../components/article/ArticleActions";
import { fetchLatestCourses } from "../components/course/CourseActions";

const Home = dynamic(import("../components/home"), { loading: () => <HomeLoader /> });

const Index = () => {
    return(
        <ErrorBoundary>
            <Home />
        </ErrorBoundary>
    );
}

Index.getInitialProps = async function({ store, req }) {
    //if server side
    if (req) {
        await initialSetupFetch(store, req);
    }

    const state = store.getState();

    //if article state doesn't exist at all fetch both
    if(state.article == null) {
        await store.dispatch(fetchAllTags(req));
        await store.dispatch(fetchAllArticles(req));
    }
    else {
        if(state.article.tags == null)  {
            await store.dispatch(fetchAllTags(req));
        }

        if (state.article.all == null) {
            await store.dispatch(fetchAllArticles(req));
        }
    }
    
    if(state.course == null) {
        await store.dispatch(fetchLatestCourses(req));
    }
    else if(state.course.latestCourses == null) {
        await store.dispatch(fetchLatestCourses(req));
    }

    return {};
}

export default Index;