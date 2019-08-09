import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import EditCourse from "./EditCourse";
import { withRouter } from "next/router";
import PropTypes from "prop-types";

import CoursePartPanel from "../../coursePartPanel";
import { fetchCourse, fetchCategories, clearCourse } from "../../course/CourseActions";
import { editCourse, deleteCourse } from "../AdminActions";

class EditCourseContainer extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.delete = this.delete.bind(this);
        this.state = { selectedCategory: "" };
    }

    handleCategoryChange = (selectedCategory) => {
        this.setState({ selectedCategory });
    }

    componentDidMount() {
        if(this.props.router.query.url != null) {
            this.props.fetchCourse(this.props.router.query.url);
        }        

        this.props.fetchCategories();
    }

    componentWillUnmount() {
        this.props.clearCourse();
    }

    getCategories() {
        if(this.props.course) {
            if(this.props.course.categories) {
                let category = this.props.course.categories.map((item, i) => {
                    return { value: item.id, label: item.category };
                }, this);

                return category;
            }
        }
         
        return [{ value: "null", label: "Not available" }];
    }

    setCategory(categoryID, category) {
        this.setState({ selectedCategory: { value: categoryID, label: category } });
    }

    componentWillReceiveProps(newProps) {
        //if we already had a course props, for example when we were just on an edit page for a different course
        if(this.props.course && newProps.course) {
            if(this.props.course.selectedCourse !== newProps.course.selectedCourse) {
                this.setCategory(newProps.course.selectedCourse.categoryID, newProps.course.selectedCourse.category);
            }
        }   
        //if the course doesnt exist in the props yet, this is first edit course page load in current session
        else if(this.props.course == null && newProps.course) {
            if(newProps.course.selectedCourse) {
                this.setCategory(newProps.course.selectedCourse.categoryID, newProps.course.selectedCourse.category);
            }
        }
    }

    submit(id, url, title, image, preview, video, exists, description, whatLearn, whoFor, prerequisites) {
        this.props.editCourse(id, url, title, image, preview, video, exists, description, this.state.selectedCategory.value, whatLearn, whoFor, prerequisites);      
    }

    delete(id) {
        if(id != null) {
            this.props.deleteCourse(id);
        }
    }

    getParts() { 
        if(this.props.course) {
            if(this.props.course.selectedCourseParts && this.props.course.selectedCourse) {
                let parts = this.props.course.selectedCourseParts.map((item, i) => {
                    return(
                        <CoursePartPanel 
                            onAdminPage={true} 
                            courseURL={this.props.course.selectedCourse.url} 
                            URL={item.url}
                            title={item.title} 
                            part={item.part} 
                            key={i} 
                        />
                    );
                })

                const courseURL = this.props.router.query.url;
                parts.unshift(<div key={-1} className="admin_new" onClick={() => this.props.router.push(`/admin/new/${courseURL}/part`)}>+</div>);

                return parts;
            }
        }

        return null;
    }

    render() {
        if (this.props.admin) {
            if (this.props.admin.success) {
                return <div onClick={this.props.router.push("/admin/courses")}></div>;
            }
        }

        return (
            <EditCourse
                submit={this.submit}
                course={this.props.course ? this.props.course.selectedCourse : null}
                adminError={this.props.admin ? this.props.admin.error : null}
                error={this.props.error}
                categories={this.getCategories()}
                selectedCategory={this.state.selectedCategory}
                handleCategoryChange={this.handleCategoryChange}
                parts={this.getParts()}
                delete={this.delete}
            />
        );
    }
}

EditCourseContainer.proptypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
}

function mapStateToProps({ course, admin }) {
    return ({ course, admin });
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourse: bindActionCreators(fetchCourse, dispatch),
        editCourse: bindActionCreators(editCourse, dispatch),
        fetchCategories: bindActionCreators(fetchCategories, dispatch),
        clearCourse: bindActionCreators(clearCourse, dispatch),
        deleteCourse: bindActionCreators(deleteCourse, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditCourseContainer));