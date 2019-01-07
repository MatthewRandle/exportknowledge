import React from "react";
import ContentLoader from "react-content-loader";

import "../../stylesheets/css/Article.css";
import "../../stylesheets/css/Container.css";
import "../../stylesheets/css/Code.css";

const Loader = (props) => {
    return (
        <ContentLoader className={props.className} height={"100%"} width={"100%"}>
            <rect width="100%" height="100%" />
        </ContentLoader>
    );
}

const SettingsLoader = () => {
    return (
        <div className="settings_container pushFooter">
            <Loader className="settings settings_loader" />
        </div>
    );
}

export default SettingsLoader;