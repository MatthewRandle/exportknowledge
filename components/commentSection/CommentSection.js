import React from "react";
import { Formik, Field } from "formik";
import * as Yup from "yup";
import isEmpty from 'lodash/isEmpty'

class CommentSection extends React.Component {
    constructor() {
        super();
        this.state = { showError: false }
        this.hideError = this.hideError.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if(newProps.error) {
            this.setState({ showError: true });
        }
    }

    hideError() {
        this.setState({ showError: false })
    }

    render() {
        return(
            <div className="commentSection_container">
                <div className="commentSection_greeting">
                    <p>Was this helpful?</p>
                    <p>Leave a comment and join in on the discussion!</p>
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
                        const comment = values.comment;
                        values.comment = "";
                        this.props.submit(comment);
                    }}
                    render={({
                        values,
                        handleSubmit,
                        errors,
                    }) => (                            
                        <form autoComplete="off" onSubmit={handleSubmit} className="commentSection_newComment">
                            <div style={{ width: "100%", position: "relative" }}>
                                <Field
                                    component="textarea"
                                    style={{ resize: "none", width: "100%", verticalAlign: "top" }}
                                    name="comment"
                                    rows="10"
                                    value={values.comment}
                                    maxLength="1500"
                                    onClick={() => {
                                        if(this.props.error) {
                                            this.hideError();
                                        }
                                    }}
                                />    

                                {this.state.showError ? 
                                    <div 
                                        style={{ position: "absolute", width: "100%", height: "100%", top: 0, display: "flex", justifyContent: "center", alignItems: "flex-end", cursor: "text", pointerEvents: "none" }}
                                    >
                                            <p style={{ color: "red", marginBottom: "10px", fontSize: "0.8rem", textAlign: "center" }}>There was a problem submitting your comment. Please try again.</p>
                                    </div>
                                    :
                                    null
                                }
                            </div>                        
                            
                            <button 
                                type="submit" 
                                disabled={!this.props.commentSent || !isEmpty(errors) }
                                className={!this.props.commentSent ? "commentSection_submit commentSection_submit--disabled" : "commentSection_submit" }
                            >
                                <p>SUBMIT</p>
                            </button>
                        </form>
                    )}
                />               
                
                <div className="commentSection_comments">
                    {this.props.comments}
                </div>
            </div>
    );
    }
}

export default CommentSection;