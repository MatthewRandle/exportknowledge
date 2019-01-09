import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import "../../stylesheets/css/Course.css";

import ErrorBoundary from "../../components/ErrorBoundary";
import initialSetupFetch from "../../utils/initialSetupFetch";
import { fetchCourse } from "../../components/course/CourseActions";
import CourseLoader from "../../components/course/CourseLoader";

const Course = dynamic(import("../../components/course"), { loading: () => <CourseLoader /> });

const CoursePage = ({ title }) => {
    return (
        <ErrorBoundary>
            <Head>
                <title>{title} - export Knowledge;</title>
            </Head>

            <Course />
        </ErrorBoundary>
    );
}

CoursePage.getInitialProps = async function ({ store, req, query }) {
    //if server side
    if (req) {
        await initialSetupFetch(store, req);
    }
    
    const state = store.getState();  

    if(state.course == null) {
        await store.dispatch(fetchCourse(query.url, req));
    }
    else if(state.course.selectedCourse == null) {
        await store.dispatch(fetchCourse(query.url, req));
    }

    //if we have the course title return it
    if (store.getState().course != null) {
        if (store.getState().course.selectedCourse != null) {
            return { title: store.getState().course.selectedCourse.title };
        }
    }

    return {};
}

export default CoursePage;