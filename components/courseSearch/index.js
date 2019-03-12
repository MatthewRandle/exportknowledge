import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";

import CourseSearch from "./CourseSearch";

class CourseSearchContainer extends Component {
    getCourses() {        
        let courses = this.props.course.all.map((item, i) => {
            return (
                <div className="courseSearch_course" key={i}>
                    <div className="courseSearch_video_and_title">
                        <Link href={`/course/${item.url}`} prefetch>
                            <a>
                                <img
                                    className="courseSearch_video"
                                    src={item.image}
                                />
                            </a>
                        </Link>
                        <h1>{item.title}</h1>
                    </div>

                    <div className="courseSearch_details">
                        <h1>Who Should Take This Course?</h1>
                        <p className="courseSearch_details_p">{item.whoFor}</p>
                        
                        <h1>What Will I Learn In This Course?</h1>
                        <p className="courseSearch_details_p">{item.whatLearn}</p>

                        <h1>What Should I Know Before I Take This Course?</h1>
                        <p className="courseSearch_details_p">{item.prerequisites}</p>

                        <Link href={{ pathname: "/course", query: { url: item.url } }} as={`/course/${item.url}`} prefetch>
                            <a className="courseSearch_button"><p>Start Course</p></a>
                        </Link>                        
                    </div>
                </div>
            );
        });

        return courses;
    }

    render() {
        return (
            <CourseSearch
                courses={this.getCourses()}
            />
        ); 
    }
}

function mapStateToProps({ course }) {
    return { course };
}

export default connect(mapStateToProps)(CourseSearchContainer);