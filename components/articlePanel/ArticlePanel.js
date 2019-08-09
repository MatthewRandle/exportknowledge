import React from "react";
import Link from "next/link";

export const ArticlePanel = (props) => {
    if(props.exists === 1 || props.onAdminPage) {
        return (
            <Link 
                href={props.onAdminPage ? { pathname: "/admin/edit/article", query: { url: props.url } } : { pathname: "/article", query: { url: props.url } }} 
                as={props.onAdminPage ? `/admin/edit/article/${props.url}` : `/article/${props.url}` }
            >
                <a className="articlePanel">
                    <div data-aos="fade-right" data-aos-duration="750" data-aos-once="true" style={{ position: "relative" }}>
                        <img src={props.image} alt={props.title} />
                        <img src={props.image} alt={props.title} />
                    </div>

                    <div className="articlePanel_content">
                        <h2>{props.title}</h2>
                        <p>{props.text_preview}...</p>
                        <button>Read More</button>
                    </div>
                </a>
            </Link>
        );
    }
    else {
        return <div style={{ display: "none" }}></div>;
    }
}

export default ArticlePanel;