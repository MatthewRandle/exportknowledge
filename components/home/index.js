import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CoursePanel from "../coursePanel";
import { fetchAllTags, fetchAllArticles } from "../article/ArticleActions";
import Home from "./Home";

export class HomeContainer extends Component {
    getLatestCourses() {
        let latest = this.props.course.latestCourses.map((item, i) => {
            return (
                <CoursePanel
                    title={item.title}
                    image={item.image}
                    exists={1}
                    timestamp={item.timestamp}
                    description={item.description}
                    admin={false}
                    length={item.length}
                    url={item.url}
                    key={i}
                    onAdminPage={false}
                />
            );
        });

        return latest;
    }

    render() {
        return (
            <Home
                latestCourses={this.getLatestCourses()}
            />
        );
    }
}

function mapStateToProps({ course, article }) {
    return { course, article };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchAllTags: bindActionCreators(fetchAllTags, dispatch),
        fetchAllArticles: bindActionCreators(fetchAllArticles, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);