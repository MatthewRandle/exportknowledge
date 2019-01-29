import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchAllTags, fetchAllArticles } from "../article/ArticleActions";
import Home from "./Home";

export class HomeContainer extends Component {
    getLatestCourses() {
        let latest = this.props.course.latestCourses.map((item, i) => {
            return (
                <div className="home_course" key={i}>
                    <iframe
                        className="home_course_video"
                        src={`https://www.youtube-nocookie.com/embed/${item.video}`}
                        title="course video"
                    />
                </div>
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