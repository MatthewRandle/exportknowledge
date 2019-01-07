import React from "react";

import "../stylesheets/css/Legal.css";
import PrivacyPolicy from "../components/legal/PrivacyPolicy";
import ErrorBoundary from "../components/ErrorBoundary";

export default () => {
    return (
        <ErrorBoundary>
            <PrivacyPolicy />
        </ErrorBoundary>
    )
}