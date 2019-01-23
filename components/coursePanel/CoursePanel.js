import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

const CoursePanel  = (props) => {
    return (
        <Link 
            href={{ pathname: "/admin/edit/course", query: { url: props.link } }} 
            as={`/admin/edit/course/${props.link}`}
        >
            <a className="coursePanel_container" style={{ border: props.exists ? "none" : "3px solid red" }}>
                <div className="coursePanel_base">
                    <img src={props.image} alt={props.title} />

                    <div className="coursePanel_content">
                        <p className="coursePanel_title">{props.title}</p>
                        <p className="coursePanel_description">{props.description}</p>
                    </div>
                </div>
            </a>
        </Link>
    );
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