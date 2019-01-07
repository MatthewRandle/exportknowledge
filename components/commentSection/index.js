import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { newArticleComment, fetchArticlesComments, newCoursePartComment, fetchCoursePartComments } from "../comment/CommentActions";
import CommentSection from "./CommentSection";
import Comment from "../comment";

class CommentSectionContaner extends Component {
    constructor() { 
        super();
        this.submitComment = this.submitComment.bind(this);
        this.state = { commentAdded: true }
    }

    componentDidMount() {
        if (this.props.articleID != null) {
            this.props.fetchArticlesComments(this.props.articleID);
        }
        else if(this.props.partID != null) {
            this.props.fetchCoursePartComments(this.props.partID);
        }
    }

    componentWillReceiveProps(newProps) {        
        //if we have comments at all
        if(this.props.comment && newProps.comment) {
            //if article comment section
            if (this.props.articleID != null) {
                if (this.props.comment.articleComments !== newProps.comment.articleComments && newProps.comment.articleComments === null) {
                    this.props.fetchArticlesComments(this.props.articleID);
                }
            }
            else if(this.props.partID != null) {
                if(this.props.comment.coursePartComments !== newProps.comment.coursePartComments && newProps.comment.coursePartComments === null) {
                    this.props.fetchCoursePartComments(this.props.partID);                    
                }
            }

            if(this.props.comment.commentAdded) {
                this.setState({ commentAdded: true });
            }
        }        
    }

    submitComment(comment) {
        if(this.props.articleID != null) {
            this.props.newArticleComment(this.props.articleID, comment);
            this.setState({ commentAdded: false })
        }
        else if(this.props.partID != null) {
            this.props.newCoursePartComment(this.props.partID, comment);
            this.setState({ commentAdded: false })
        }
    }

    getComments() {
        if(this.props.comment) {
            let sortedComments;
            let comments;

            //if article comment section
            if (this.props.articleID != null) {                
                if (this.props.comment.articleComments) {
                    sortedComments = this.props.comment.articleComments.sort((a, b) => {
                        return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0;
                    });

                    comments = sortedComments.map((item, i) => {
                        return (
                            <Comment
                                key={i}
                                userComment={item}
                                articleID={this.props.articleID}
                                partID={null}
                            />
                        );
                    });
                }            
            }
            else if(this.props.partID != null) {
                if(this.props.comment.coursePartComments) {
                    sortedComments = this.props.comment.coursePartComments.sort((a, b) => {
                        return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0;
                    });

                    comments = sortedComments.map((item, i) => {
                        return (
                            <Comment
                                key={i}
                                userComment={item}
                                partID={this.props.partID}
                                articleID={null}
                            />
                        );
                    });
                }
            }            

            return comments;
        }           
    }

    render() {
        return (
            <CommentSection
                submit={this.submitComment}
                comments={this.getComments()}
                commentAdded={this.state.commentAdded}
            />
        );
    }
}

CommentSectionContaner.propTypes = {
    articleID: PropTypes.any,
    courseID: PropTypes.any
}

function mapStateToProps({ comment }) {
    return { comment };
}

const mapDispatchToProps = dispatch => {
    return {
        newArticleComment: bindActionCreators(newArticleComment, dispatch),
        fetchArticlesComments: bindActionCreators(fetchArticlesComments, dispatch),
        newCoursePartComment: bindActionCreators(newCoursePartComment, dispatch),
        fetchCoursePartComments: bindActionCreators(fetchCoursePartComments, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentSectionContaner);