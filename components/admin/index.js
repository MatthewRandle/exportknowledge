import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "next/router";

import Admin from "./Admin";
import ArticlePanel from "../articlePanel";
import CoursePanel from "../coursePanel";
import { fetchAllArticles, reset, fetchAllCourses } from "./AdminActions";
import AdminCheck from "./AdminCheck";


class AdminContainer extends Component {
    //load data depending on the current path
    getData() {
        const currentPath = this.props.router.pathname;

        if(currentPath === "/admin") {
            return null;
        }
        else if (currentPath === "/admin/courses") {
            return this.getCourses();
        }
        else if(currentPath === "/admin/articles") {
            return this.getArticles();
        }
    }    

    getArticles() {
        let articles;

        if(this.props.admin) {
            if (this.props.admin.allArticles) {
                articles = this.props.admin.allArticles.map((item, i) => {
                    return <ArticlePanel
                        title={item.title}
                        image={item.image}
                        url={item.url}
                        exists={item.exists}
                        key={i}
                        timestamp={item.timestamp}
                        description={item.description}
                        admin={true}
                    />
                });

                //add button to beggining of array
                articles.unshift(<div key={-1} className="admin_new" onClick={() => this.props.router.push("/admin/new/article")}>+</div>);

                return articles;
            }
        }

        return <p>cant get articles</p>;     
    }

    getCourses() {
        let courses;

        if (this.props.admin) {
            if (this.props.admin.allCourses) {
                courses = this.props.admin.allCourses.map((item, i) => {
                    return <CoursePanel
                        title={item.title}
                        image={item.image}
                        exists={item.exists}
                        key={i}
                        timestamp={item.timestamp}
                        description={item.description}
                        length={item.length}
                        onAdminPage={true}
                        url={item.url}
                    />
                });

                //add button to beggining of array
                courses.unshift(<div key={-1} className="admin_new" onClick={() => this.props.router.push("/admin/new/course")}>+</div>);

                return courses;
            }
        }

        return <p>cant get courses</p>;
    }

    render() {
        return(
            <AdminCheck>
                <Admin data={this.getData()} articles={this.props.router.pathname === "/admin/articles" ? true : false} />
            </AdminCheck>
        );
    }
}

function mapStateToProps ({ admin }) {
    return(
        { admin }
    );
}

const mapDispatchToProps = dispatch => {
    return{
        fetchAllArticles: bindActionCreators(fetchAllArticles, dispatch),
        reset: bindActionCreators(reset, dispatch),
        fetchAllCourses: bindActionCreators(fetchAllCourses, dispatch),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminContainer));