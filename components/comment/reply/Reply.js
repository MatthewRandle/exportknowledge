import React from "react";

import CommentSettings from "../CommentSettings";
import "../../../stylesheets/css/CommentSection.css";

const Reply = (props) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="comment_container">
                <div className="comment_author">
                    <p>{props.username}</p>

                    {props.isOwner || props.isAdmin ? 
                        <CommentSettings 
                            replyID={props.replyID} 
                            articleID={props.articleID} 
                            partID={props.partID} 
                            reply={true}
                        /> 
                        : null
                    }
                </div>

                <div className="comment">
                    <p>{props.reply}</p>
                </div>


            </div>

            <div className="comment_buttons">
                
            </div>
        </div>
    );
}

export default Reply;