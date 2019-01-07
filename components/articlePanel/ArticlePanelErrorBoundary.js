import React from "react";

const ArticlePanelErrorBoundary = (props) => {    
    return (
        <div className={props.onAdminPage ? "articlePanel_container articlePanel_container--adminPage" : "articlePanel_container"} onClick={props.push}>
            <div className="articlePanel_base">
                <img src={props.image} alt={"Error"} />
                <div className="articlePanel_base_text">
                    <p className="articlePanel_title">Oops, looks like something went wrong fetching the article! {props.title ? `(${props.title})` : null}</p>
                    <p className="articlePanel_description">{props.description}</p>
                </div>
            </div>

            <div className={props.exists === 1 ? "articlePanel_bottomBar" : "articlePanel_bottomBar articlePanel_bottomBar--doesntExist"}>
            </div>
        </div>
    ); 
}

export default ArticlePanelErrorBoundary;