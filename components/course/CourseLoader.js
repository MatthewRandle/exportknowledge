import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => {
    return (
        <ContentLoader className={props.className} height={"100%"} width={"100%"} style={props.style}>
            <rect width="100%" height="100%" />
        </ContentLoader>
    );
}

const CourseLoader = (props) => {
    return (
        <div className="course_container pushFooter">
            <div className="course">
                <div className="course_preface">
                    <Loader
                        className="course_video"
                        style={{ border: "0" }}
                    />

                    <div className="course_text">
                        <div>
                            <Loader className="course_title--loading" />
                            <Loader className="course_description--loading" />
                        </div>
                    </div>
                </div>

                <div className="course_parts">
                    <Loader className="coursePanel_container" />
                </div>
            </div>
        </div>
    );
}

export default CourseLoader;