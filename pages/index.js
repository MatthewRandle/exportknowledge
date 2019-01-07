import React from "react";
import dynamic from "next/dynamic";

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
        await initialSetupFetch(store, req);

        await store.dispatch(fetchLatestCourses(req));
        await store.dispatch(fetchAllTags(req));
        await store.dispatch(fetchAllArticles(req));

        return {};
}

export default Index;