import React from "react";
import ta from "time-ago";

import CommentSettings from "../CommentSettings";

const Reply = (props) => {
    const timestamp = ta.ago(new Date(props.timestamp));
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="comment_container">
                <img className="comment_profile_picture" src={props.profile_picture} />
                {props.isOwner || props.isAdmin ? <CommentSettings reply={true} replyID={props.replyID} articleID={props.articleID} partID={props.partID} /> : null}

                <div className="comment_content">
                    <div className="comment_topBar">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img className="comment_profile_picture--tablet" src={props.profile_picture} />
                            <p className="comment_author">{props.username}</p>
                            {props.authority ? <img title="Admin" style={{ marginLeft: "10px", height: "15px" }} src={"/static/verified.svg"} /> : null}
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <p className="comment_timestamp">{timestamp.indexOf("ms") !== -1 ? "Just Now" : timestamp}</p>
                            {props.isOwner || props.isAdmin ? <CommentSettings className="commentSettings_container--tablet" commentID={props.commentID} articleID={props.articleID} partID={props.partID} /> : null}
                        </div>
                    </div>

                    <p className="comment">{props.reply}</p>
                </div>
            </div>
        </div>
    );
}

export default Reply;