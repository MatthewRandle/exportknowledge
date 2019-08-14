import Head from "next/head";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import "../../stylesheets/css/Code.css";
import "../../stylesheets/css/CommentSection.css";
import "../../stylesheets/css/Course.css";
import "../../stylesheets/css/CoursePartPanel.css";

import ErrorBoundary from "../../components/ErrorBoundary";
import CommentSection from "../../components/commentSection";
import initialSetupFetch from "../../utils/initialSetupFetch";
import { fetchCourse, clearCourse, fetchCoursePart } from "../../components/course/CourseActions";
import ParseText from "../../components/ParseText";
import Video from "../../components/Video";

const CoursePage = ({ title }) => {
    const dispatch = useDispatch();
    const course = useSelector(state => state.course.selectedCourse);
    const parts = useSelector(state => state.course.selectedCourseParts);
    const currentPart = useSelector(state => state.course.selectedPart);

    useEffect(() => {
        return () => {
            dispatch(clearCourse());
        }
    })

    return (
        <ErrorBoundary>
            <Head>
                <title>{title} - export Knowledge;</title>
            </Head>

            <div className="course_container pushFooter">
                <div className="course">
                    <div className="course_panel">
                        <div className="course_video_container">
                            <Video
                                className="course_video"
                                image={currentPart.image}
                                video={currentPart.video}
                            />
                        </div>

                        <div className="course_panel_content">
                            <h3>{parts.length} Parts</h3>
                            <div className="course_panel_parts" style={{ paddingRight: parts.length > 6 ? "10px" : "0" }}>
                                {parts.map((item, i) => {
                                    return (
                                        <Link key={i} href={`/course/${course.url}/${item.url}`}>
                                            <a className={currentPart.title === item.title ? "part_panel part_panel--active" : "part_panel"}>
                                                <h2>{item.part}</h2>
                                                <p>{item.title}</p>
                                            </a>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="course_text">
                        <h1>{currentPart.title}</h1>
                        <ul>
                            <ParseText text={currentPart.text} />
                        </ul>
                    </div>

                    <CommentSection articleID={null} partID={currentPart.id} />
                </div>
            </div>
        </ErrorBoundary>
    );
}

CoursePage.getInitialProps = async function ({ store, req, query }) {
    //if server side
    if (req) {
        await initialSetupFetch(store, req);
    }

    const state = store.getState();

    if (state.course == null) {
        await store.dispatch(fetchCourse(query.courseURL, req));
        await store.dispatch(fetchCoursePart(query.partURL, query.courseURL, req));
    }
    else if (state.course.selectedCourse == null) {
        await store.dispatch(fetchCourse(query.courseURL, req));
    }

    if(state.course != null) {
        if(state.course.selectedPart == null) {
            await store.dispatch(fetchCoursePart(query.partURL, query.courseURL, req));
        }
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