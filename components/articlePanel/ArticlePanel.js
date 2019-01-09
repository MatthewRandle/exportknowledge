import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

import "../../stylesheets/css/ArticlePanel.css";

export const ArticlePanel = (props) => {
    if(props.exists === 1 || props.onAdminPage) {
        return (
            <Link href={{ pathname: "/article", query: { url: props.link } }} as={`/article/${props.link}`}>
                <a className="articlePanel_container">
                    <div className="articlePanel_base">
                        <img src={props.image} alt={props.title} />

                        <div className="articlePanel_content">
                            <p className="articlePanel_title">{props.title}</p>
                            <p className="articlePanel_description">{props.description}</p>
                        </div>
                    </div>

                    <div className={props.exists === 1 ? "articlePanel_bottomBar" : "articlePanel_bottomBar articlePanel_bottomBar--doesntExist"}>
                        <p>{props.commentCount || 0} {props.commentCount === 1 ? "Comment" : "Comments"}</p>
                        <p className="articlePanel_date">{props.timestamp}</p>
                    </div>
                </a>
            </Link>
        );
    }
    else {
        return <div style={{ display: "none" }}></div>;
    }
}

ArticlePanel.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    exists: PropTypes.number.isRequired,
    timestamp: PropTypes.string.isRequired,
    onAdminPage: PropTypes.bool.isRequired,
    comments: PropTypes.number
}

export default ArticlePanel;