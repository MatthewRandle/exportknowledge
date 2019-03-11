import React from "react";

import Video from "../Video";
import CommentSection from "../commentSection";

const CoursePart = (props) => {
    return(
        <div className="coursePart_container pushFooter">
            <div className="coursePart">
                <div className="coursePart_preface">
                    <Video
                        className="coursePart_video"
                        video={props.video}
                        image={props.image}
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