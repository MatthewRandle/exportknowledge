import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "next/router";

import { fetchCoursePart, clearCoursePart } from "../../../course/CourseActions";
import { editCoursesPart, clearSuccess, deleteCoursePart } from "../../AdminActions";
import EditCoursePart from "./EditCoursePart";

class EditCoursePartContainer extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        let part = this.props.router.query.partURL;
        let course = this.props.router.query.courseURL;

        this.props.fetchCoursePart(part, course, null);        
    }

    componentWillUnmount() {
        this.props.clearCoursePart();
    }

    submit(title, video, description, url, text, length, part, exists, image) {        
        let partURL = this.props.router.query.partURL;
        let courseURL = this.props.router.query.courseURL;

        //cant edit courses part if we dont know what course the part is from
        if (courseURL.length <= 0) { return; }
        
        if(partURL.length > 0) {
            this.props.editCoursesPart(courseURL, partURL, title, video, description, url, text, length, part, exists, image);
        }
    }

    delete(id) {
        if(id != null) {
            this.props.deleteCoursePart(id);
        }
    }

    render() {
        if (this.props.admin) {
            if (this.props.admin.success) {
                this.props.clearSuccess();
                return <div onClick={this.props.router.push(`/admin/edit/course/${this.props.router.query.courseURL}`)}></div>
            }
        }

        return(
            <EditCoursePart
                submit={this.submit}
                part={this.props.course ? this.props.course.selectedPart : null}
                error={this.props.error}
                adminError={this.props.admin ? this.props.admin.error : null}
                delete={this.delete}
            />
        )
    }
}

function mapStateToProps({ course, admin }) {
    return (
        { course, admin }
    );
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCoursePart: bindActionCreators(fetchCoursePart, dispatch),
        clearCoursePart: bindActionCreators(clearCoursePart, dispatch),
        editCoursesPart: bindActionCreators(editCoursesPart, dispatch),
        clearSuccess: bindActionCreators(clearSuccess, dispatch),
        deleteCoursePart: bindActionCreators(deleteCoursePart, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCoursePartContainer));