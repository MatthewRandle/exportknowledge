import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Link from "next/link";

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

                    <p className="home_course_title">{item.title}</p>
                    <Link href={{ pathname: "/course", query: { url: item.url } }} as={`/course/${item.url}`}>
                        <a className="home_course_button">Take Course</a>
                    </Link>
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