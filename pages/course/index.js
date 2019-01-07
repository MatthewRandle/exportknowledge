import React from "react";
import dynamic from "next/dynamic";

import "../../stylesheets/css/Course.css";

import ErrorBoundary from "../../components/ErrorBoundary";
import initialSetupFetch from "../../utils/initialSetupFetch";
import { fetchCourse } from "../../components/course/CourseActions";
import CourseLoader from "../../components/course/CourseLoader";

const Course = dynamic(import("../../components/course"), { loading: () => <CourseLoader /> });

const CoursePage = () => {
    return (
        <ErrorBoundary>
            <Course />
        </ErrorBoundary>
    );
}

CoursePage.getInitialProps = async function ({ store, req, query }) {
    await initialSetupFetch(store, req);
    await store.dispatch(fetchCourse(query.url, req));

    return {};
}

export default CoursePage;