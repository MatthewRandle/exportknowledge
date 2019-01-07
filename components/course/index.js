import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CoursePartPanel from "../coursePartPanel";
import Course from "./Course";
import { clearCourse } from "../course/CourseActions";

class CourseContainer extends Component {
    componentWillUnmount() {
        this.props.clearCourse();
    }

    getParts() {
        let parts = this.props.course.selectedCourseParts.map((item, i) => {
            return (
                <CoursePartPanel 
                    courseURL={this.props.course.selectedCourse.url} 
                    URL={item.url} 
                    title={item.title} 
                    part={item.part} 
                    key={i} 
                />
            )
        })

        return parts;
    }

    render() {
        return (
            <Course
                parts={this.getParts()}
                video={this.props.course.selectedCourse.video}
                title={this.props.course.selectedCourse.title}
                description={this.props.course.selectedCourse.description}
                courseID={this.props.course.selectedCourse.id}
                whoFor={this.props.course.selectedCourse.whoFor}
                whatLearn={this.props.course.selectedCourse.whatLearn}
                prerequisites={this.props.course.selectedCourse.prerequisites}
            />
        );
    }
}

function mapStateToProps({ course, admin }) {
    return ({ course, admin });
}

const mapDispatchToProps = dispatch => {
    return {
        clearCourse: bindActionCreators(clearCourse, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseContainer);