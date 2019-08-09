import React, { Component } from "react";
import ArticlePanel from "./ArticlePanel";
import { withRouter } from "next/router";

import ArticlePanelErrorBoundary from "./ArticlePanelErrorBoundary";

export class ArticlePanelContainer extends Component {
    getDatePosted() {
        if(this.props.timestamp) {
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            var date = new Date(this.props.timestamp);
            var month = months[date.getUTCMonth()]; //months from 1-12
            var day = date.getUTCDate();
            var year = date.getUTCFullYear();

            let newdate = `${day} ${month}, ${year}`;

            return newdate;
        }
        else {
            return null;
        }
    }

    checkAdminPage() {
        if(this.props.router.pathname === "/admin/articles") {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        if(this.props.title && (this.props.image || this.props.admin) && this.props.text_preview && this.props.url && this.props.timestamp) {
            return (
                <ArticlePanel
                    title={this.props.title}
                    image={this.props.image}
                    text_preview={this.props.text_preview}
                    url={this.props.url}
                    exists={this.props.exists}
                    timestamp={this.getDatePosted()}
                    onAdminPage={this.checkAdminPage()}
                    commentCount={this.props.commentCount}
                />
            );
        }
        
        return <div style={{ display: "none" }}></div>;
    }
}

export default withRouter(ArticlePanelContainer);