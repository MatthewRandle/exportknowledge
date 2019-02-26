import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => {
    return (
        <ContentLoader className={props.className} height={"100%"} width={"100%"} style={props.style}>
            <rect width="100%" height="100%" />
        </ContentLoader>
    );
}

const CourseSearchLoader = () => {
    return (
        <div className="courseSearch_container pushFooter">
            <div className="courseSearch">
                <div className="courseSearch_courses">
                    <CourseLoader />
                    <CourseLoader />
                    <CourseLoader />
                </div>
            </div>
        </div>
    )
}

const CourseLoader = () => {
    return(
        <div className="courseSearch_course">
            <div className="courseSearch_video_and_title">
                <Loader className="courseSearch_video" />
                <Loader className="courseSearch_title--loader" />
            </div>

            <div className="courseSearch_details">
                <Loader className="courseSearch_header--loader" />
                <Loader className="courseSearch_text--loader" />

                <Loader className="courseSearch_header--loader" />
                <Loader className="courseSearch_text--loader" />

                <Loader className="courseSearch_header--loader" />
                <Loader className="courseSearch_text--loader" />

                <Loader className="courseSearch_button--loader" />
            </div>
        </div>
    )
}

export default CourseSearchLoader;