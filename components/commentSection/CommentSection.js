import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import isEmpty from 'lodash/isEmpty'

import "../../stylesheets/css/CommentSection.css";

const CommentSection = (props) => {
    return(
        <div className="commentSection_container">
            <div className="commentSection_greeting">
                <p>Was this helpful?</p>
                <p>Leave a comment and join in on the disussion!</p>
            </div>
            
            <Formik
                enableReinitialize={true}
                validationSchema= { Yup.object().shape({
                    comment: Yup.string().trim()
                    .min(1, "Please enter a comment.")
                    .required("Please enter a comment.")
                })}
                initialValues={{
                    comment: "",
                }}
                onSubmit={(values, actions) => {
                    props.submit(values.comment);                        

                    values.comment = "";
                }}
                render={({
                    values,
                    handleSubmit,
                    errors,
                }) => (                            
                    <form autoComplete="off" onSubmit={handleSubmit} className="commentSection_newComment">
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
                            disabled={!props.commentAdded || !isEmpty(errors) }
                            className={!props.commentAdded ? "commentSection_submit commentSection_submit--disabled" : "commentSection_submit" }
                        >
                            SUBMIT
                        </button>
                    </form>
                )}
            />               
            
            <div className="commentSection_comments">
                {props.comments}
            </div>
        </div>
    );
}

export default CommentSection;