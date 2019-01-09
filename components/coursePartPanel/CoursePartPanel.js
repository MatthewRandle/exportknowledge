import React from "react";
import Link from "next/link";

import "../../stylesheets/css/CoursePartPanel.css";

const CoursePartPanel = (props) => {
    return(
        <Link href={{ pathname: "/course/part", query: { courseURL: props.link.courseURL, partURL: props.link.partURL } }} as={`/course/${props.link.courseURL}/${props.link.partURL}`}>
            <a className="coursePartPanel_container">
                <div className="coursePartPanel_part"><p>{props.part}</p></div>
                <div className="coursePartPanel_title"><p>{props.title}</p></div>
                <div className="coursePartPanel_open"><p>></p></div>
            </a>
        </Link>
    );
}

export default CoursePartPanel;