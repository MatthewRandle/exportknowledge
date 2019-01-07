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
                    <Loader className="jumbotron_title--loader">Use our in depth courses to learn and become a full stack web developer for free.</Loader>

                    <div className="home_courses">
                        <Loader className="coursePanel_container" />
                        <Loader className="coursePanel_container" />
                        <Loader className="coursePanel_container" />
                    </div>

                    <Loader className="home_button--loader"/>
                </div>
            </div>

            <div className="home">

            </div>
        </div>    
    );
};

export default HomeLoader;