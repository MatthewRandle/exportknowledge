import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => {
    return (
        <ContentLoader className={props.className} height={"100%"} width={"100%"} style={props.style}>
            <rect width="100%" height="100%" />
        </ContentLoader>
    );
}

const CoursePartLoader = (props) => {
    return (
        <div className="coursePart_container pushFooter">
            <div className="coursePart">
                <div className="coursePart_preface" style={{ border: 0 }}>
                    <Loader
                        className="coursePart_video"
                        style={{ border: "0" }}
                    />

                    <div className="coursePart_information">
                        <Loader className="coursePart_title--loading" />
                        <Loader className="coursePart_description--loading" />
                    </div>
                </div>


                <div className="coursePart_text_container">
                    <Loader className="coursePart_text--loading" />
                </div>  
            </div>
        </div>
    );
}

export default CoursePartLoader;