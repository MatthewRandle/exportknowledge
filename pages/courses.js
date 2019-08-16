import React from "react";
import Head from "next/head";
import { useSelector } from "react-redux";

import "../stylesheets/css/CoursePanel.css";
import "../stylesheets/css/Courses.css";

import ErrorBoundary from "../components/ErrorBoundary";
import CoursePanel from "../components/coursePanel";
import initialSetupFetch from "../utils/initialSetupFetch";
import { fetchAllCourses } from "../components/course/CourseActions";

const CoursesPage = () => {
    const courses = useSelector(state => state.course.all);

    return(
        <ErrorBoundary>
            <Head>
                <link rel="canonical" href="https://exportknowledge.com/courses" />
                <title>Courses - export Knowledge;</title>
                <meta name="description" content="All of the courses here at export Knowledge. Each course has several parts that each have a written and video tutorial." />
            </Head>

            <div className="courses_container">
                <div className="courses">
                    {courses.map((item, i) => {
                        return (
                            <CoursePanel
                                key={i}
                                url={`/course/${item.course_url}/${item.part_url}`}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                parts={item.parts}
                            />
                        )
                    })}
                </div>
            </div>
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