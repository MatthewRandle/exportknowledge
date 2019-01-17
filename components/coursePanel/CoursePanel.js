import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import "../../stylesheets/css/CoursePanel.css";

const CoursePanel  = (props) => {
    if(props.exists === 1 || props.onAdminPage) {
        return (
            <Link 
                href={props.onAdminPage ? { pathname: "/admin/edit/course", query: { url: props.link } } : { pathname: "/course", query: { url: props.link } }} 
                as={props.onAdminPage ? `/admin/edit/course/${props.link}`: `/course/${props.link}` }
            >
                <a className="coursePanel_container">
                    <div className="coursePanel_base">
                        <img src={props.image} alt={props.title} />

                        <div className="coursePanel_content">
                            <p className="coursePanel_title">{props.title}</p>
                            <p className="coursePanel_description">{props.description}</p>
                        </div>
                    </div>

                    {/* <div className={props.exists === 0 ? "coursePanel_bottomBar coursePanel_bottomBar--doesntExist" : "coursePanel_bottomBar" } >
                    <p>{Math.round(props.length * 100) / 100} hours</p>
                    <p>{props.timestamp}</p>
                </div> */}
                </a>
            </Link>
        );
    }
    else {
        return <div style={{ display: "none" }}></div>;
    }
};

CoursePanel.proptypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    exists: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    admin: PropTypes.bool,
    length: PropTypes.number.isRequired,
    openCourse: PropTypes.func.isRequired
};

export default CoursePanel;