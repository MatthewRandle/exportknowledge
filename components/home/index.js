import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { withRouter } from "next/link";

import Home from "./Home";

export class HomeContainer extends Component {
    componentDidMount() {
        this.props.router.prefetch("/courses");
    }

    getLatestCourses() {
        let latest = this.props.course.latestCourses.map((item, i) => {
            return (
                <div className="home_course" key={i}>
                    <Link href={`/course/${item.url}`}>
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

export default withRouter(connect(mapStateToProps)(HomeContainer));