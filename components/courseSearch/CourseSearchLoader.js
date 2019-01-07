import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => {
    return (
        <ContentLoader className={props.className} height={"100%"} width={"100%"} style={props.style}>
            <rect width="100%" height="100%" />
        </ContentLoader>
    );
}

const CoursePanelLoader = (props) => {
    return(
        <div className="coursePanel_container">
            <Loader className="coursePanel_base" />
            <Loader className="coursePanel_bottomBar" style={{ background: "none", padding: 0 }} />
        </div>
    )
}

const CourseSearchLoader = (props) => {
    return (
        <div className="courseSearch_container pushFooter">
            <div className="courseSearch">
                <div className="courseSearch_section">
                    <Loader className="courseSearch_sectionTitle" />
                    <div className="courseSearch_courses">
                        <CoursePanelLoader />
                        <CoursePanelLoader />
                        <CoursePanelLoader />
                    </div>
                </div>

                <div className="courseSearch_section">
                    <Loader className="courseSearch_sectionTitle" />
                    <div className="courseSearch_courses">
                        <CoursePanelLoader />
                        <CoursePanelLoader />
                        <CoursePanelLoader />
                    </div>
                </div>

                <div className="courseSearch_section">
                    <Loader className="courseSearch_sectionTitle" />
                    <div className="courseSearch_courses">
                        <CoursePanelLoader />
                        <CoursePanelLoader />
                        <CoursePanelLoader />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseSearchLoader;