import React from "react";
import ContentLoader from "react-content-loader";

import "../../stylesheets/css/Article.css";
import "../../stylesheets/css/Container.css";
import "../../stylesheets/css/Code.css";

const Loader = (props) => {
    return(
        <ContentLoader className={props.className} height={"100%"} width={"100%"}>
            <rect width="100%" height="100%" />
        </ContentLoader>  
    );
}

const ArticleLoader = (props) => {
    return (
        <div className="article_container pushFooter">
            <div className="article_jumbotron">
                <div className="container">
                    <div className="article_content">                        
                        <Loader className="article_image" />

                        <div className="article_title_container">
                            <div className="article_title">
                                <p>
                                    . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .
                                </p>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>


            <div className="article">
                <ContentLoader height={"1000px"} width={"100%"} style={{ height: "1000px", width: "100%", marginTop: "60px" }} />
            </div>
        </div>
    );
}

export default ArticleLoader;