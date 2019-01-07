import React from "react";

import "../../stylesheets/css/Course.css";

const Course = (props) => {
    return(
        <div className="course_container pushFooter">
            <div className="course">
                <div className="course_info">
                    <iframe
                        className="course_video"
                        src={`https://www.youtube-nocookie.com/embed/${props.video}`}
                        title="course video"
                    />

                    <div className="course_text">
                        <p className="course_title">{props.title}</p>
                        <p className="course_description">{props.description}</p>
                    </div>
                </div>

                <div className="course_preface">             
                    <h1>Who Should Take This Course?</h1>
                    <p>{props.whoFor}</p>

                    <h1>What Will I Learn In This Course?</h1>
                    <p>{props.whatLearn}</p>

                    <h1>What Should I Know Before I Take This Course?</h1>
                    <p>{props.prerequisites}</p>
                </div>

                <div className="course_parts">
                    {props.parts}
                </div>
            </div>
        </div>
    );
}

export default Course;