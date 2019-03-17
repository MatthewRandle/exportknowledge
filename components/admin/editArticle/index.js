import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "next/router";

import EditArticle from "./editArticle";
import { newArticle, editArticle, deleteArticle, fetchAllArticles } from "../AdminActions";
import AdminCheck from "../AdminCheck";

class EditArticleContainer extends Component {
    constructor(props) {
        super(props);
        this.submitArticle = this.submitArticle.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.state = { selectedPrerequisites: "", selectedTags: ""};
    }

    componentDidMount() {
        this.props.fetchAllArticles();
        console.log(this.props.admin)

        if(this.props.admin) {
            if (this.props.admin.selectedArticlesTags) {
                this.setTags(this.props.admin.selectedArticlesTags);
            }

            //if the prerequisites arent the same
            if (this.props.admin.selectedArticlesPrerequisites) {
                this.setPrerequisites(this.props.admin.selectedArticlesPrerequisites);
            }
        }
    }

    handlePrerequisiteChange = (selectedPrerequisites) => {
        this.setState({ selectedPrerequisites });
    }

    handleTagsChange = (selectedTags) => {
        this.setState({ selectedTags });
    }

    getTags() {
        try {
            let tags = this.props.article.tags.map((item, i) => {
                    return { value: item.id, label: item.name };
                }, this);

            return tags;
        }
        catch (err) {
            return [{ value: "null", label: "Not available" }];
        }
    }

    setTags(tags) {
        let selectedTags = tags.map((item, i) => {
            return { value: item.id, label: item.name };
        });

        this.setState({ selectedTags });   
    }

    componentWillReceiveProps(newProps) {    
        if(newProps.admin) {
            if(newProps.admin.success === true) {
                this.props.router.push("/admin/articles");
            }
        }
    }

    submitArticle(id, url, title, image, text, video, exists, description) {
        //if we dont have url we are making a new article
        if (this.props.url == null) {
            this.props.newArticle(url, title, image, text, video, this.state.selectedTags, exists, this.state.selectedPrerequisites, description, this.props.router);            
        }
        else {
            this.props.editArticle(id, url, title, image, text, video, this.state.selectedTags, exists, this.state.selectedPrerequisites, description);
        }     
    }

    getPrerequistes() {
        try {
            let prerequisites = this.props.admin.allArticles.filter((item) => {
                //need to check for selected article prop here, if new article no prerequisites will show
                if(this.props.admin) {
                    if(this.props.admin.selectedArticle) {
                        if (this.props.admin.selectedArticle.title === item.title) {
                            return false;
                        }
                    }
                }
                return true;
            })
            .map((item) => {                    
                return { value: item.id, label: item.title };                   
            })
            
            return prerequisites;
        } 
        catch(err) {
            return [{ value: "null", label: "Not available" }];
        }     
    }

    setPrerequisites(prerequisites) {
        let selectedPrerequisites = prerequisites.map((item, i) => {
            return { value: item.id, label: item.title };
        });

        this.setState({ selectedPrerequisites });
    }

    deleteArticle(id) {
        if (this.props.url != null) {
            this.props.deleteArticle(id);
            this.props.router.push("/admin/articles");
        }
    }

    render() {
        return (
            <AdminCheck>
                <EditArticle
                    prerequisites={this.getPrerequistes()}
                    selectedPrerequisites={this.state.selectedPrerequisites}
                    tags={this.getTags()}
                    selectedTags={this.state.selectedTags}
                    handlePrerequisiteChange={this.handlePrerequisiteChange}
                    handleTagsChange={this.handleTagsChange}
                    submit={this.submitArticle}
                    adminError={this.props.admin ? this.props.admin.error : null}
                    article={this.props.admin ? this.props.admin.selectedArticle : null}
                    delete={this.deleteArticle}
                    error={this.props.error ? this.props.error.databaseError ? this.props.error.databaseError.sqlMessage : null : null }
                />
            </AdminCheck>
        );        
    }
}

function mapStateToProps({ article, admin, error }) {
    return ({ article, admin, error });
}

const mapDispatchToProps = dispatch => {
    return{
        newArticle: bindActionCreators(newArticle, dispatch),
        editArticle: bindActionCreators(editArticle, dispatch),
        deleteArticle: bindActionCreators(deleteArticle, dispatch),
        fetchAllArticles: bindActionCreators(fetchAllArticles, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditArticleContainer));