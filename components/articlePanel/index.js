import React, { Component } from "react";
import ArticlePanel from "./ArticlePanel";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import ScrollAnimation from "react-animate-on-scroll";

import "../../stylesheets/css/Animate.css";

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
        if(this.props.title && (this.props.image || this.props.admin) && this.props.description && this.props.url && this.props.timestamp && this.props.url) {
            return (
                <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                    <ArticlePanel
                        title={this.props.title}
                        image={this.props.image}
                        description={this.props.description}
                        url={this.props.url}
                        link={this.props.url}
                        exists={this.props.exists}
                        timestamp={this.getDatePosted()}
                        onAdminPage={this.checkAdminPage()}
                        commentCount={this.props.commentCount}
                    />
                </ScrollAnimation>
            );
        }
        
        return <ArticlePanelErrorBoundary title={this.props.title} />;
    }
}

ArticlePanelContainer.propTypes = {
    admin: PropTypes.bool,
    url: PropTypes.string,
    timestamp: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    exists: PropTypes.number,
    comments: PropTypes.number,
    location: PropTypes.any
}

export default withRouter(ArticlePanelContainer);