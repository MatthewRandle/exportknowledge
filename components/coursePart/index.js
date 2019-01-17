import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CoursePart from "./CoursePart";
import { clearComment } from "../comment/CommentActions";
import { clearCoursePart } from "../course/CourseActions";
import ParseText from "../ParseText";

class CoursePartContainer extends Component {
    componentWillUnmount() {
        this.props.clearCoursePart();
        this.props.clearComment();
    }

    getText() {
        if (this.props.course) {
            if (this.props.course.selectedPart) {
                return <ParseText text={this.props.course.selectedPart.text} />;
            }
        }

        return null;
    }

    render() {
        return (
            <CoursePart
                title={this.props.course.selectedPart.title}
                video={this.props.course.selectedPart.video}
                description={this.props.course.selectedPart.description}
                part={this.props.course.selectedPart.part}
                text={this.getText()}
                partID={this.props.course.selectedPart.id}
            />
        )
    }
}

function mapStateToProps({ course }) {
    return ({ course });
}

const mapDispatchToProps = dispatch => {
    return {
        clearComment: bindActionCreators(clearComment, dispatch),
        clearCoursePart: bindActionCreators(clearCoursePart, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursePartContainer);