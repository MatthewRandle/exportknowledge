import React, { Component } from "react";
import { connect } from "react-redux";

import Video from "../Video";
import Home from "./Home";

export class HomeContainer extends Component {
    getLatestCourses() {
        let latest = this.props.course.latestCourses.map((item, i) => {
            return (
                <div className="home_course" key={i}>
                    <Video
                        className="home_course_video"
                        video={item.video}
                        image={item.image}
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

export default connect(mapStateToProps)(HomeContainer);