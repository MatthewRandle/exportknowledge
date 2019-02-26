import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

import CommentSection from "../commentSection";

const Article = (props) => {    
    return(        
        <div className="article_container pushFooter">
            <Head>
                <title>{props.title} - export Knowledge;</title>
            </Head>

            <div className="article_jumbotron">
                <div className="article_content">
                    {props.video !== null ? 
                        <iframe 
                            className="article_image" 
                            src= {`https://www.youtube-nocookie.com/embed/${props.video}`}
                            title="article video"
                        />
                        : <img className="article_image" src={props.image} alt="" />
                    }

                    <div className="article_title_container">
                        <p className="article_title">{props.title}</p>
                    </div>
                </div>
            </div>

            <div className="article">
                {/* Render prerequisites if they exist */}
                {props.prerequisites.length > 0 ?
                    <div>
                        <div className="article_prerequisites_container">
                            <p className="article_header">Prerequisites</p>
                            {props.prerequisites}
                        </div>

                        <div className="article_lineBreak" />
                    </div>
                    : null
                }

                <ul className="article_text_container">
                    {props.text}
                </ul>

                {props.furtherReading.length > 0 ?
                    <div className="article_prerequisites_container">
                        <div>
                            <p className="article_header">Further Reading</p>
                            {props.furtherReading}
                        </div>
                    </div>
                    : null
                }
            </div>

            {/* Only render comments section when we have article */}
            {props.id ?
                <div className="article_commentSection">
                    <CommentSection articleID={props.id} courseID={null} />
                </div>
                : null
            }
        </div>
    );    
}

export default Article;

Article.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    prerequisites: PropTypes.array.isRequired,
}