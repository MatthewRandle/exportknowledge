import React from "react";

import CommentSection from "../commentSection";
import "../../stylesheets/css/CoursePart.css";

const CoursePart = (props) => {
    return(
        <div className="coursePart_container pushFooter">
            <div className="coursePart">
                <div className="coursePart_preface">
                    <iframe
                        className="coursePart_video"
                        src={`https://www.youtube-nocookie.com/embed/${props.video}`}
                        title="course part video"
                    />

                    <div className="coursePart_information">
                        <p className="coursePart_title">{`Part ${props.part}: ${props.title}`}</p>
                        <p className="coursePart_description">{props.description}</p>                   
                    </div>
                </div>

                
                <div className="coursePart_text_container">
                    <ul className="coursePart_text">
                        {props.text}
                    </ul> 
                </div>  
            </div>

            <CommentSection articleID={null} partID={props.partID} />
        </div>
    )
}

export default CoursePart;