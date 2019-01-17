import React, { Component } from "react";
import { withRouter } from "next/router";
import PropTypes from "prop-types";

import CoursePartPanel from "./CoursePartPanel";

class CoursePartPanelContainer extends Component {
    render() {
        if(this.props.title && this.props.part != null) {
            return (
                <CoursePartPanel 
                    title={this.props.title}
                    part={this.props.part}
                    courseURL={this.props.courseURL}
                    partURL={this.props.URL}
                    onAdminPage={this.props.onAdminPage}
                />
            );
        }

        return (
            <div>course panel part loader</div>
        );
    }
}

CoursePartPanelContainer.proptypes = {
    onAdminPage: PropTypes.bool.isRequired,
    courseURL: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    URL: PropTypes.string.isRequired,
    part: PropTypes.number.isRequired
}

export default withRouter(CoursePartPanelContainer);
