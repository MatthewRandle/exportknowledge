import React from "react";
import ta from "time-ago";

import CommentSettings from "../CommentSettings";

const Reply = (props) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="comment_container">
                <img className="comment_profile_picture" src={props.profile_picture} />
                {props.isOwner || props.isAdmin ? <CommentSettings commentID={props.commentID} articleID={props.articleID} partID={props.partID} /> : null}

                <div className="comment_content">
                    <div className="comment_topBar">
                        <p className="comment_author">{props.username}</p>
                        <p className="comment_timestamp">{ta.ago(new Date(props.timestamp))}</p>
                    </div>

                    <p className="comment">{props.reply}</p>
                </div>
            </div>
        </div>
    );
}

export default Reply;