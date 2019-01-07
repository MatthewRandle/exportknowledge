import React from "react";

import "../stylesheets/css/Legal.css";
import TermsAndConditions from "../components/legal/TermsAndConditions";
import ErrorBoundary from "../components/ErrorBoundary";

export default () => {
    return(
        <ErrorBoundary>
            <TermsAndConditions />
        </ErrorBoundary>
    )
}