import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { deleteArticlesComment, deleteCoursePartComment, deleteArticlesCommentReply, deleteCoursesCommentReply } from "./CommentActions";

class CommentSettings extends Component {
    constructor(props) {
        super(props);

        this.state = { showMenu: false };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mouseup', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mouseup', this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.closeMenu();
        }
    }

    closeMenu() {
        this.setState({ showMenu: false });
    }

    toggleMenu() {
        this.setState({ showMenu: !this.state.showMenu });
    }

    renderMenu() {
        switch (this.state.showMenu) {
            case true:
                return (
                    <div className="commentSettings" >
                        <p onClick={this.deleteComment}>Delete</p>
                    </div>
                );
            default:
                return;
        }
    }

    deleteComment() {
        if(this.props.reply) {
            if(this.props.articleID != null) {
                this.props.deleteArticlesCommentReply(this.props.replyID, this.props.articleID);
            }
            else if(this.props.partID != null) {
                this.props.deleteCoursesCommentReply(this.props.replyID, this.props.partID);
            }
        }
        else {
            if (this.props.articleID != null) {
                this.props.deleteArticlesComment(this.props.commentID, this.props.articleID);
            }
            else if (this.props.partID != null) {
                this.props.deleteCoursePartComment(this.props.commentID, this.props.partID);
            }
        }
        
        this.toggleMenu(); //toggle menu after button is pressed
    }

    render() {
        return (
            <div className={this.props.className == null ? "commentSettings_container" : this.props.className} ref={this.setWrapperRef}>
                <img src="/static/ellipsis.svg" className="commentSettings_icon" onClick={this.toggleMenu.bind(this)} />
                {this.renderMenu()}
            </div>
        );
    }
}

function mapStateToProps({ article }) {
    return { article };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteArticlesComment: bindActionCreators(deleteArticlesComment, dispatch),
        deleteCoursePartComment: bindActionCreators(deleteCoursePartComment, dispatch),
        deleteArticlesCommentReply: bindActionCreators(deleteArticlesCommentReply, dispatch),
        deleteCoursesCommentReply: bindActionCreators(deleteCoursesCommentReply, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentSettings);