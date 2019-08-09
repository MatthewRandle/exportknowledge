import React, { Component } from "react";
import ArticleSearch from "./ArticleSearch";
import { connect } from "react-redux";
import Proptypes from "prop-types";

import ArticlePanel from "../articlePanel";

export class ArticleSearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchQuery: "", 
            tags: [],
            filter: "latest"
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    handleFilterChange = (evt) => {
        this.setState({ filter: evt.target.value });
    }

    handleSearch = (evt) => {
        this.setState({ searchQuery: evt.target.value });
    }

    handleTagChange = (name) => {
        //if new value is already in array remove it
        if(this.state.tags.indexOf(name) !== -1) {
            //find unchecked in array
            let index = this.state.tags.indexOf(name);
            let tags = [...this.state.tags];

            //if unchecked is in array, delete it
            if (index !== -1) {
                tags.splice(index, 1);
                this.setState({ tags });
            } 
        }
        //add to array
        else {
            this.setState({ tags: [...this.state.tags, name] });
        }
    }

    getTags() {
        let tags = this.props.article.tags.map((item, i) => {
            return(
                <li 
                    key={i} 
                    className={this.state.tags.indexOf(item.name) === -1 ? "articleSearch_checkbox" : "articleSearch_checkbox articleSearch_checkbox--checked"} 
                    onClick={() => this.handleTagChange(item.name)}
                >
                    {item.name}
                    {this.state.tags.indexOf(item.name) === -1 ? <p>✖</p> : <p>✔</p>}     
                </li>
            );
        });

        return tags;
    }

    getArticles() {
        let filteredTags;
        //only filter using tags if at least one tag is used
        if(this.state.tags.length > 0) {
            filteredTags = this.props.article.all.filter((item) => {
                //if the article doesn't have one of the selected tags return true (filter out)
                return this.state.tags.some((value) => item.tags.includes(value));
            })
        }
        else {
            filteredTags = this.props.article.all;
        }

        let filteredSearch = filteredTags.filter((item) => {   
            return item.title.toLowerCase().includes(this.state.searchQuery.toLowerCase());
        });

        let filtered = filteredSearch.sort((a, b) => {
            //sort by date
            if(this.state.filter === "latest") {
                return a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0;
            }
            //else oldest first
            else {
                return a.timestamp > b.timestamp ? 1 : a.timestamp < b.timestamp ? -1 : 0;
            }            
        })

        let articles = filtered.map((item, i) => {
            return(
                <ArticlePanel
                    title={item.title}
                    image={item.image}
                    url={item.url}
                    exists={item.exists}
                    key={i}
                    timestamp={item.timestamp}
                    text_preview={item.text_preview}
                    admin={false}
                    commentCount={item.comments + item.replies}
                    id={item.id}
                />
            );
        });

        return articles;
    }

    render() {
        return(
            <ArticleSearch
                articles={this.getArticles()}
                handleSearch={this.handleSearch}
                searchQuery={this.state.searchQuery}
                tags={this.getTags()}
                handleFilterChange={this.handleFilterChange}
            />
        );
    }
}

ArticleSearchContainer.proptypes = {
    fetchAllTags: Proptypes.func.isRequired,
    fetchAllArticles: Proptypes.func.isRequired,
    article: Proptypes.any.isRequired,
}

function mapStateToProps({ article }) {
    return { article };
}

export default connect(mapStateToProps)(ArticleSearchContainer);