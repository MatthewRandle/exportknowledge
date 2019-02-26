import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => {
    return (
        <ContentLoader className={props.className} height={"100%"} width={"100%"}>
            <rect width="100%" height="100%" />
        </ContentLoader>
    );
};

const HomeLoader = () => {
    return(
        <div className="home_container pushFooter">
            <div className="home_jumbotron_container">
                <div className="home_jumbotron">
                    <Loader className="jumbotron_title jumbotron_title--loader">Use our in depth courses to learn and become a full stack web developer for free.</Loader>

                    <div className="jumbotron_courses">
                        <div className="home_course">
                            <Loader className="home_course_video" />
                        </div>

                        <div className="home_course">
                            <Loader className="home_course_video" />
                        </div>
                    </div>

                    <Loader className="jumbotron_button--loader"></Loader>
                </div>
            </div>

            <div className="home">
                <ArticleSearchLoader />
            </div>
        </div>       
    );
};

const ArticleSearchLoader = () => {
    return(
        <div className="articleSearch">  
            <div className="articleSearch_top_bar">
                <Loader className="articleSearch_title articleSearch_title--loader">Browse Articles</Loader>

                <div className="articleSearch_filter">
                    <Loader className="articleSearch_select articleSearch_select--loader" />

                    <Loader className="articleSearch_searchBar articleSearch_searchBar--loader" />
                </div>
            </div>

            <div className="articleSearch_panel">
                <ul className="articleSearch_tags">
                    <li className="articleSearch_checkbox articleSearch_checkbox--loader">Loading.....</li>
                    <li className="articleSearch_checkbox articleSearch_checkbox--loader">Loading.....</li>
                    <li className="articleSearch_checkbox articleSearch_checkbox--loader">Loading.....</li>
                    <li className="articleSearch_checkbox articleSearch_checkbox--loader">Loading.....</li>
                    <li className="articleSearch_checkbox articleSearch_checkbox--loader">Loading.....</li>
                    <li className="articleSearch_checkbox articleSearch_checkbox--loader">Loading.....</li>
                </ul>
            </div>

            <div className="articleSearch_articles">
                <Loader className="articlePanel_container articlePanel_container--loader" />
                <Loader className="articlePanel_container articlePanel_container--loader" />
                <Loader className="articlePanel_container articlePanel_container--loader" />
                <Loader className="articlePanel_container articlePanel_container--loader" />
                <Loader className="articlePanel_container articlePanel_container--loader" />
                <Loader className="articlePanel_container articlePanel_container--loader" />
                <Loader className="articlePanel_container articlePanel_container--loader" />
                <Loader className="articlePanel_container articlePanel_container--loader" />
                <Loader className="articlePanel_container articlePanel_container--loader" />
                <Loader className="articlePanel_container articlePanel_container--loader" />
                <Loader className="articlePanel_container articlePanel_container--loader" />
                <Loader className="articlePanel_container articlePanel_container--loader" />
            </div>
        </div>
    )
}

export default HomeLoader;