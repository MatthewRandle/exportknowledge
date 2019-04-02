import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import isEmpty from 'lodash/isEmpty'
import ta from "time-ago";

import CommentSettings from "./CommentSettings";

class NewReply extends React.Component {
    constructor() {
        super();
        this.state = { showError: false }
        this.hideError = this.hideError.bind(this);
    }

    componentDidUpdate() {
        console.log(this.props)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.error) {
            this.setState({ showError: true });
        }
    }

    hideError() {
        this.setState({ showError: false })
    }

    render() {
        return (
            <Formik
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    comment: Yup.string().trim()
                        .min(1, "Please enter a comment.")
                        .required("Please enter a comment.")
                })}
                initialValues={{
                    comment: "",
                }}
                onSubmit={(values) => {
                    const comment = values.comment;
                    values.comment = "";
                    this.props.submitReply(this.props.articleID, this.props.partID, this.props.commentID, comment);
                }}
                render={({
                    values,
                    handleSubmit,
                    errors,
                }) => (
                        <form autoComplete="off" onSubmit={handleSubmit} className="commentSection_newReply comment_newReply">
                            <div style={{ width: "100%", position: "relative" }}>
                                <Field
                                    component="textarea"
                                    style={{ resize: "none", width: "100%", verticalAlign: "top" }}
                                    name="comment"
                                    rows="10"
                                    value={values.comment}
                                    maxLength="1500"
                                    onClick={() => {
                                        if (this.props.error) {
                                            this.hideError();
                                        }
                                    }}
                                />

                                {this.state.showError ?
                                    <div
                                        style={{ position: "absolute", width: "100%", height: "100%", top: 0, display: "flex", justifyContent: "center", alignItems: "flex-end", cursor: "text", pointerEvents: "none" }}
                                    >
                                        <p style={{ color: "red", marginBottom: "10px", fontSize: "0.6rem", textAlign: "center" }}>There was a problem submitting your comment. Please try again.</p>
                                    </div>
                                    :
                                    null
                                }
                            </div>

                            <button
                                type="submit"
                                disabled={!this.props.replySent || !isEmpty(errors)}
                                className={!this.props.replySent ? "commentSection_submit commentSection_submit--disabled" : "commentSection_submit"}
                            >
                                SUBMIT
                        </button>
                        </form>
                    )}
            />
        )
    }
}

const Comment = (props) => { 
    const timestamp = ta.ago(new Date(props.timestamp));
    return(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="comment_container">
                <img className="comment_profile_picture" src={props.profile_picture} />

                {props.isOwner || props.isAdmin ? <CommentSettings commentID={props.commentID} articleID={props.articleID} partID={props.partID} /> : null}  

                <div className="comment_content">
                    <div className="comment_topBar">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img className="comment_profile_picture--tablet" src={props.profile_picture} />
                            <p className="comment_author">{props.username}</p>
                            <img title="Admin" style={{ marginLeft: "10px", height: "15px" }} src={"/static/verified.svg"}/>
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                            <p className="comment_timestamp">{timestamp.indexOf("ms") !== -1 ? "Just Now" : timestamp}</p>
                            {props.isOwner || props.isAdmin ? <CommentSettings className="commentSettings_container--tablet" commentID={props.commentID} articleID={props.articleID} partID={props.partID} /> : null} 
                        </div>
                    </div>

                    <p className="comment">{props.comment}</p>                        

                    <div className="comment_replyButton" onClick={props.toggleReplyBox}>
                        <p>REPLY</p>
                    </div>
                </div>                            
            </div>

            <div className="comment_replies">
                {props.showReplyBox === true ? 
                    <NewReply 
                        replySent={props.replySent}
                        submitReply={props.submitReply}
                        articleID={props.articleID}
                        commentID={props.commentID}
                        partID={props.partID}
                        error={props.replyError}
                        replySent={props.replySent}
                    />
                    : null
                }              

                {props.replies}
            </div>
        </div>
    );    
}

export default Comment;