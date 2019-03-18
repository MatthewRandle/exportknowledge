import React from "react";
import PropTypes from "prop-types";

const ArticleSearch = (props) => {
    return(
        <div className="articleSearch">       
            <div className="articleSearch_top_bar">
                <h1 className="articleSearch_title">Browse Articles</h1>

                <div className="articleSearch_filter">
                    <select className="articleSearch_select" onChange={props.handleFilterChange}>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>

                    <input
                        className="articleSearch_searchBar"
                        type="text"
                        name="search"
                        value={props.searchQuery}
                        onChange={props.handleSearch}
                        placeholder="Search"
                    />
                </div>
            </div>

            <div className="articleSearch_panel">
                <ul className="articleSearch_tags">
                    {props.tags}
                </ul>
            </div>             

            <div className="articleSearch_articles">
                {props.articles}
            </div>
        </div>
    );
};

ArticleSearch.proptypes = {
    searchQuery: PropTypes.string.isRequired,
    handleSearch: PropTypes.func.isRequired,
    articles: PropTypes.any,
    tags: PropTypes.any.isRequired
};

export default ArticleSearch;