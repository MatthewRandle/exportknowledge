import React from "react";
import dynamic from "next/dynamic";

import "../stylesheets/css/CourseSearch.css";

import ErrorBoundary from "../components/ErrorBoundary";
import initialSetupFetch from "../utils/initialSetupFetch";
import { fetchAllCourses } from "../components/course/CourseActions";
import CourseSearchLoader from "../components/courseSearch/CourseSearchLoader";

const CourseSearch = dynamic(import("../components/courseSearch"), { loading: () => <CourseSearchLoader /> });

const CoursesPage = () => {
    return(
        <ErrorBoundary>
            <CourseSearch />
        </ErrorBoundary>
    )
}

CoursesPage.getInitialProps = async function ({ store, req }) {
    //if server side
    if (req) {
        await initialSetupFetch(store, req);
    }
    
    const state = store.getState(); 

    if(state.course == null) {
        await store.dispatch(fetchAllCourses(req));
    }
    else if(state.course.all == null) {
        await store.dispatch(fetchAllCourses(req));
    }
    


    return {};
}

export default CoursesPage;