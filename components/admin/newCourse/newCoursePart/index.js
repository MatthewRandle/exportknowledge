import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "next/router";

import { newCoursePart, clearSuccess } from "../../AdminActions";
import NewCoursePart from "./NewCoursePart";

class NewCoursePartContainer extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    submit(title, video, description, url, text, length, exists, image) {
        let courseURL = this.props.router.query.courseUrl;

        //cant edit courses part if we dont know what course the part is from
        if (courseURL.length <= 0) { return; }

        this.props.newCoursePart(courseURL, title, video, description, url, text, length, exists, image);
    }

    render() {
        if (this.props.admin) {
            if (this.props.admin.success) {
                this.props.clearSuccess();
                return <div onClick={this.props.router.push(`/admin/edit/course/${this.props.router.query.courseUrl}`)}></div>;
            }
        }

        return (
            <NewCoursePart
                submit={this.submit}
                error={this.props.error}
                adminError={this.props.admin ? this.props.admin.error : null}
            />
        )
    }
}

function mapStateToProps({ admin }) {
    return (
        { admin }
    );
}

const mapDispatchToProps = dispatch => {
    return {
        newCoursePart: bindActionCreators(newCoursePart, dispatch),
        clearSuccess: bindActionCreators(clearSuccess, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewCoursePartContainer));