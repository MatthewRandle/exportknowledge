import React from "react";

const CourseSearch = (props) => {
    return(
        <div className="courseSearch_container pushFooter">
            <div className="courseSearch">
                <div className="courseSearch_courses">
                    {props.courses}
                </div>
            </div> 
        </div>
    );
}

export default CourseSearch;