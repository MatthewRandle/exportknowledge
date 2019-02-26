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
                <div className="course_info">
                    <Loader className="course_video" />

                    <div className="course_text">
                        <Loader className="course_title--loader"/>
                        <Loader className="course_description--loader"/>
                    </div>
                </div>

                <div className="course_preface">
                    <Loader className="course_preface_h1_whoFor--loader"/>
                    <Loader className="course_preface_p--loader"/>

                    <Loader className="course_preface_h1_whatLearn--loader"/>
                    <Loader className="course_preface_p--loader"/>

                    <Loader className="course_preface_h1_prerequisites--loader"/>
                    <Loader className="course_preface_p--loader" />
                </div>

                <div className="course_parts">
                    <Loader className="coursePartPanel_container--loader" />
                    <Loader className="coursePartPanel_container--loader" />
                    <Loader className="coursePartPanel_container--loader" />
                    <Loader className="coursePartPanel_container--loader" />
                    <Loader className="coursePartPanel_container--loader" />
                </div>
            </div>
        </div>
    );
}

export default CourseLoader;