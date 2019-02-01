import React from "react";
import Link from "next/link";

import ArticleSearch from "../articleSearch";

const Home = (props) => {   
    return (                
        <div className="home_container pushFooter">    
            <div className="home_jumbotron_container">
                <div className="home_jumbotron">                        
                    <p className="jumbotron_title">Use our in depth courses to learn and become a full stack web developer for free.</p>                   

                    <div className="jumbotron_courses">
                        {props.latestCourses}
                    </div>  

                    <Link prefetch href="/courses">
                        <a className="jumbotron_button"><p>Start Learning</p></a>
                    </Link>                    
                </div>                 
            </div>

            <div className="home">                   
                <ArticleSearch className="home_articles" />
            </div>           
        </div>            
    );
};

export default Home;