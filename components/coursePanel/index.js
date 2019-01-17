import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "next/router";

import CoursePanel from "./CoursePanel";

class CoursePanelContainer extends Component {
    getTimestamp() {
        if (this.props.timestamp) {
            let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


            var date = new Date(this.props.timestamp);
            var month = months[date.getUTCMonth()]; //months from 1-12
            var day = date.getUTCDate();
            var year = date.getUTCFullYear();

            let newdate = `${day} ${month}, ${year}`;

            return newdate;
        }
        else {
            return null;
        }
    }

    getLength() {
        if(this.props.length) {
            return this.props.length / 60;
        }
        else {
            return 0;
        }
    }

    render() {
        return(
            <CoursePanel 
                title={this.props.title}
                image={this.props.image}
                exists={this.props.exists}
                timestamp={this.getTimestamp()}
                description={this.props.description}
                length={this.getLength()}
                link={this.props.url}
                onAdminPage={this.props.onAdminPage}
            />
        )
    }
}

CoursePanelContainer.proptypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    exists: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    onAdminPage: PropTypes.bool.isRequired
}

export default withRouter(CoursePanelContainer);