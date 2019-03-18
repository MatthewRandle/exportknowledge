import React, { Component } from "react";
import { connect } from "react-redux";

import Home from "./Home";

export class HomeContainer extends Component {
    getLatestCourses() {
        let latest = this.props.course.latestCourses.map((item, i) => {
            return (
                <div className="home_course" key={i}>
                        <a onClick={(() => setTimeout(() => this.props.router.push(`/course/${item.url}`), 100))}>
                            <img
                                className="home_course_image"
                                src={item.image}
                            />
                        </a>
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

export default connect(mapStateToProps)(HomeContainer);