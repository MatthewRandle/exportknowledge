import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import AdminCheck from "../AdminCheck";
import { withRouter } from "next/router";

import NewCourse from "./NewCourse";
import { fetchCategories } from "../../course/CourseActions";
import { newCourse } from "../AdminActions";

class NewCourseContainer extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.state = { selectedCategory: "" };
    }

    handleCategoryChange = (selectedCategory) => {
        this.setState({ selectedCategory });
    }

    componentDidMount() {        
        this.props.fetchCategories();
    }

    getCategories() {
        if (this.props.course) {
            if (this.props.course.categories) {
                let category = this.props.course.categories.map((item, i) => {
                    return { value: item.id, label: item.category };
                }, this);

                return category;
            }
        }

        return [{ value: "null", label: "Not available" }];
    }

    submit(url, title, image, preview, video, exists, description, whatLearn, whoFor, prerequisites) {
        this.props.newCourse(url, title, image, preview, video, exists, description, this.state.selectedCategory.value, whatLearn, whoFor, prerequisites);
    }

    render() {
        if (this.props.admin) {
            if (this.props.admin.success) {
                return <div onClick={this.props.router.push("/admin/courses")}></div>;
            }
        }

        return (
            <AdminCheck>
                <NewCourse
                    submit={this.submit}
                    adminError={this.props.admin ? this.props.admin.error : null}
                    error={this.props.error}
                    categories={this.getCategories()}
                    selectedCategory={this.state.selectedCategory}
                    handleCategoryChange={this.handleCategoryChange}
                />
            </AdminCheck>
        );
    }
}

function mapStateToProps({ course, admin }) {
    return ({ course, admin });
}

const mapDispatchToProps = dispatch => {
    return {
        newCourse: bindActionCreators(newCourse, dispatch),
        fetchCategories: bindActionCreators(fetchCategories, dispatch),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewCourseContainer));