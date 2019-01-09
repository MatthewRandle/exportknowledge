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
                        <iframe
                            className="courseSearch_video"
                            src={`https://www.youtube-nocookie.com/embed/${item.video}`}
                            title="article video"
                        />
                        <h1>{item.title}</h1>
                    </div>

                    <div className="courseSearch_details">
                        <h1>Who Should Take This Course?</h1>
                        <p>{item.whoFor}</p>
                        
                        <h1>What Will I Learn In This Course?</h1>
                        <p>{item.whatLearn}</p>

                        <h1>What Should I Know Before I Take This Course?</h1>
                        <p>{item.prerequisites}</p>

                        <Link href={{ pathname: "/course", query: { url: item.url } }} as={`/course/${item.url}`} prefetch>
                            <a>Start Course</a>
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