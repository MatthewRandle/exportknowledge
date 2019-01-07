import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Comment from "./Comment";
import Reply from "./reply";
import { newArticleReply, newCourseseReply } from "./CommentActions";

class CommentContainer extends Component {
    constructor() {
        super();
        this.state = { showReplyBox: false, replyAdded: true };
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
            return "Anonymous";
        }
    }

    submitReply(articleID, partID, commentID, comment) {
        if(articleID != null) {
            this.props.newArticleReply(articleID, commentID, comment);
        }
        else if(partID != null) {
            this.props.newCourseseReply(partID, commentID, comment);
        }

        this.toggleReplyBox();
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
                isOwner={this.props.userComment.commenter_oauthID === this.props.user.id ? true : false}
                isAdmin={this.props.admin ? this.props.admin.authorised === true ? true : false : false}
                comment={this.props.userComment.comment}
                commentID={this.props.userComment.id}
                toggleReplyBox = {this.toggleReplyBox}
                showReplyBox = {this.state.showReplyBox}    
                articleID={this.props.articleID}
                partID={this.props.partID}
                replyAdded={this.state.replyAdded}
                submitReply={this.submitReply}
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
        newCourseseReply: bindActionCreators(newCourseseReply, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);