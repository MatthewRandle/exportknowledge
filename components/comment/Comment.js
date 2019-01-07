import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import isEmpty from 'lodash/isEmpty'

import CommentSettings from "./CommentSettings";
import "../../stylesheets/css/CommentSection.css";

const NewReply = (props) => {
    return(
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
            onSubmit={(values, actions) => {
                props.submitReply(props.articleID, props.partID, props.commentID, values.comment);

                values.comment = "";
            }}
            render={({
                values,
                handleSubmit,
                errors,
            }) => (
                    <form autoComplete="off" onSubmit={handleSubmit} className="commentSection_newReply comment_newReply">
                        <Field
                            component="textarea"
                            style={{ resize: "none", width: "100%" }}
                            name="comment"
                            rows="10"
                            value={values.comment}
                            maxLength="1500"
                        />

                        <button
                            type="submit"
                            disabled={!props.replyAdded || !isEmpty(errors)}
                            className={!props.replyAdded ? "commentSection_submit commentSection_submit--disabled" : "commentSection_submit"}
                        >
                            SUBMIT
                        </button>
                    </form>
                )}
        />
    )
}

const Comment = (props) => { 
    return(
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="comment_container">
                <div className="comment_author">
                    <p>{props.username}</p>
                    
                    {props.isOwner || props.isAdmin ? <CommentSettings commentID={props.commentID} articleID={props.articleID} partID={props.partID} /> : null}
                </div>

                <div className="comment">
                    <p>{props.comment}</p>
                </div>

                
            </div>

            <div className="comment_buttons">
                <p onClick={props.toggleReplyBox}>Reply</p>
            </div>

            <div className="comment_replies">
                {props.showReplyBox === true ? 
                    <NewReply 
                        replyAdded={props.replyAdded}
                        submitReply={props.submitReply}
                        articleID={props.articleID}
                        commentID={props.commentID}
                        partID={props.partID}
                    />
                    : null
                }

                {props.replies}
            </div>
        </div>
    );    
}

export default Comment;