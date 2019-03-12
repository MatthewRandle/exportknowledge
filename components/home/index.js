import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";

import Home from "./Home";

export class HomeContainer extends Component {
    getLatestCourses() {
        let latest = this.props.course.latestCourses.map((item, i) => {
            return (
                <div className="home_course" key={i}>
                    <Link href={`/course/${item.url}`} prefetch>
                        <a>
                            <img
                                className="home_course_image"
                                src={item.image}
                            />
                        </a>
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

export default connect(mapStateToProps)(HomeContainer);