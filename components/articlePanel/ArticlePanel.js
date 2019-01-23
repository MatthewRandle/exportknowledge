import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";

export const ArticlePanel = (props) => {
    if(props.exists === 1 || props.onAdminPage) {
        return (
            <Link 
                href={props.onAdminPage ? { pathname: "/admin/edit/article", query: { url: props.link } } : { pathname: "/article", query: { url: props.link } }} 
                as={props.onAdminPage ? `/admin/edit/article/${props.link}` : `/article/${props.link}` }
            >
                <a className="articlePanel_container">
                    <img src={props.image} alt={props.title} />

                    <div className="articlePanel_base">
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