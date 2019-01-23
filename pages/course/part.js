import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import "../../stylesheets/css/Code.css";
import "../../stylesheets/css/CommentSection.css";
import "../../stylesheets/css/CoursePart.css";

import ErrorBoundary from "../../components/ErrorBoundary";
import initialSetupFetch from "../../utils/initialSetupFetch";
import { fetchCoursePart } from "../../components/course/CourseActions";
import CoursePartLoader from "../../components/coursePart/CoursePartLoader";

const CoursePart = dynamic(import("../../components/coursePart"), { loading: () => <CoursePartLoader /> });

const CoursePartPage = (props) => {
    return (
        <ErrorBoundary>
            <Head>
                <title>{props.title} - export Knowledge;</title>
            </Head>

            <CoursePart />
        </ErrorBoundary>
    );
}

CoursePartPage.getInitialProps = async function ({ store, req, query }) {
    //if server side
    if (req) {
        await initialSetupFetch(store, req);
    }

    const state = store.getState(); 

    if(state.course == null) {
        await store.dispatch(fetchCoursePart(query.partURL, query.courseURL, req));
    }
    else if(state.course.selectedPart == null) {
        await store.dispatch(fetchCoursePart(query.partURL, query.courseURL, req));
    }
    
    
    //if we have the course title return it
    if(store.getState().course != null) {
        if (store.getState().course.selectedPart != null) {
            return { title: store.getState().course.selectedPart.title };
        }
    }
    
    return {};
}

export default CoursePartPage;