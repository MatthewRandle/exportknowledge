import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Comment from "./Comment";
import Reply from "./reply";
import { newArticleReply, newCoursesReply, fetchArticlesComments, fetchCoursePartComments } from "./CommentActions";

class CommentContainer extends Component {
    constructor() {
        super();
        this.state = { showReplyBox: false, replySent: true, replyError: false };
        this.toggleReplyBox = this.toggleReplyBox.bind(this);
        this.submitReply = this.submitReply.bind(this);
    }

    toggleReplyBox() {
        this.setState({ showReplyBox: !this.state.showReplyBox });
    }

    getUserName() {
        if(this.props.userComment.commenter_forename != null && this.props.userComment.commenter_surname != null) {
            return `${this.props.userComment.commenter_forename} ${this.props.userComment.commenter_surname}`;
        }
        else {
            return "Deleted";
        }
    }

    componentWillReceiveProps(newProps) {
        //if we have comments at all
        if (this.props.userComment && newProps.userComment) {
            //if article comment section
            if (this.props.articleID != null) {
                if (this.props.comment.articleComments !== newProps.comment.articleComments && newProps.comment.articleComments === null) {
                    this.props.fetchArticlesComments(this.props.articleID);
                }
            }
            else if (this.props.partID != null) {
                if (this.props.comment.coursePartComments !== newProps.comment.coursePartComments && newProps.comment.coursePartComments === null) {
                    this.props.fetchCoursePartComments(this.props.partID);
                }
            }

            if (newProps.comment.replySent && newProps.comment.replyError) {
                this.setState({ replySent: true, replyError: true });
            }
            else if (newProps.comment.commentSent) {
                this.setState({ replySent: true })
            }
        }
    }

    submitReply(articleID, partID, commentID, comment) {
        if(articleID != null) {
            this.setState({ replySent: false, replyError: false })
            this.props.newArticleReply(articleID, commentID, comment);
        }
        else if(partID != null) {
            this.setState({ replySent: false, replyError: false })
            this.props.newCoursesReply(partID, commentID, comment);
        }
    }

    getReplies() {
        if(this.props.userComment.replies != null) {
            let replies = this.props.userComment.replies.map((item, i) => {
                return (
                    <Reply 
                        reply={item} 
                        parentCommentID={this.props.userComment.id}
                        replyID={item.id}
                        key={i} 
                        articleID={this.props.articleID}
                        partID={this.props.partID}
                    />
                )
            })

            return replies;
        }

        return null;
    }

    render() {
        return (
            <Comment
                username={this.getUserName()}
                replies={this.getReplies()}
                profile_picture={this.props.userComment.commenter_profile_picture}
                isOwner={this.props.userComment.commenter_oauthID === this.props.user ? this.props.user.id : null ? true : false}
                isAdmin={this.props.admin ? this.props.admin.authorised === true ? true : false : false}
                comment={this.props.userComment.comment}
                commentID={this.props.userComment.id}
                toggleReplyBox = {this.toggleReplyBox}
                showReplyBox = {this.state.showReplyBox}    
                articleID={this.props.articleID}
                partID={this.props.partID}
                replySent={this.state.replySent}
                submitReply={this.submitReply}
                replyError={this.state.replyError}
                replySent={this.state.replySent}
                timestamp={this.props.userComment.timestamp}
            />
        );
    }
}

CommentContainer.proptypes = {
    comment: PropTypes.isRequired,
}

function mapStateToProps({ user, comment, admin }) {
    return { user, comment, admin };
}

const mapDispatchToProps = dispatch => {
    return {
        newArticleReply: bindActionCreators(newArticleReply, dispatch),
        newCoursesReply: bindActionCreators(newCoursesReply, dispatch),
        fetchArticlesComments: bindActionCreators(fetchArticlesComments, dispatch),
        fetchCoursePartComments: bindActionCreators(fetchCoursePartComments, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);