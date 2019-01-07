import React from "react";

import "../stylesheets/css/Legal.css";
import CookiePolicy from "../components/legal/CookiePolicy";
import ErrorBoundary from "../components/ErrorBoundary";

export default () => {
    return (
        <ErrorBoundary>
            <CookiePolicy />
        </ErrorBoundary>
    )
}