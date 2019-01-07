import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => {
    return (
        <ContentLoader className={props.className} height={"100%"} width={"100%"}>
            <rect width="100%" height="100%" />
        </ContentLoader>
    );
};

const ArticleSearchLoader = () => {
    return(
        <div className="articleSearch">
            <div className="articleSearch_top_bar">
                <Loader className="articleSearch_title--loader"/>

                <div className="articleSearch_filter">
                    <Loader className="articleSearch_select--loader"/>

                    <Loader className="articleSearch_searchBar--loader"/>
                </div>
            </div>

            <div className="articleSearch_panel">
                <ul className="articleSearch_tags">
                    <Loader className="articleSearch_checkbox--loader" />
                    <Loader className="articleSearch_checkbox--loader" />
                    <Loader className="articleSearch_checkbox--loader" />
                    <Loader className="articleSearch_checkbox--loader" />
                    <Loader className="articleSearch_checkbox--loader" />
                    <Loader className="articleSearch_checkbox--loader" />
                </ul>
            </div>

            <div className="articleSearch_articles">
                <Loader className="articlePanel_container" />
                <Loader className="articlePanel_container" />
                <Loader className="articlePanel_container" />
                <Loader className="articlePanel_container" />
                <Loader className="articlePanel_container" />
                <Loader className="articlePanel_container" />
                <Loader className="articlePanel_container" />
                <Loader className="articlePanel_container" />
            </div>
        </div>
    );
};

export default ArticleSearchLoader;