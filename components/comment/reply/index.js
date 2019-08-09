import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Reply from "./Reply";
import { newArticleReply } from "../CommentActions";

class ReplyContainer extends Component {
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
        if (this.props.reply.forename != null && this.props.reply.surname != null) {
            return `${this.props.reply.forename} ${this.props.reply.surname}`;
        }
        else {
            return "Deleted";
        }
    }

    submitReply(articleID, commentID, comment) {
        this.props.newArticleReply(articleID, commentID, comment);
    }

    render() {
        return (
            <Reply
                username={this.getUserName()}
                isOwner={this.props.reply.oauthID === this.props.user.id}
                isAdmin={this.props.admin ? this.props.admin.authorised === true ? true : false : false}
                reply={this.props.reply.comment}
                parentCommentID={this.props.parentCommentID}
                replyID={this.props.replyID}
                articleID={this.props.articleID}
                toggleReplyBox={this.toggleReplyBox}
                showReplyBox={this.state.showReplyBox}                
                partID={this.props.partID}
                replyAdded={this.state.replyAdded}
                submitReply={this.submitReply}
                profile_picture={this.props.reply.profile_picture}
                timestamp={this.props.reply.timestamp}
                authority={this.props.reply.authority}
            />
        );
    }
}

function mapStateToProps({ user, comment, admin }) {
    return { user, comment, admin };
}

const mapDispatchToProps = dispatch => {
    return {
        newArticleReply: bindActionCreators(newArticleReply, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyContainer);