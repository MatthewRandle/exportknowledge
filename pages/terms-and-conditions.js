import React from "react";
import Head from "next/head";

import "../stylesheets/css/Legal.css";
import TermsAndConditions from "../components/legal/TermsAndConditions";
import ErrorBoundary from "../components/ErrorBoundary";

export default () => {
    return(
        <ErrorBoundary>
            <Head>
                <link rel="canonical" href="https://exportknowledge.com/terms-and-conditions" />
                <title>Terms and Conditions - export Knowledge;</title>
                <meta name="description" content="Terms and conditions for export Knowledge detailing how you use our site and the rules you will follow." />
            </Head>
            <TermsAndConditions />
        </ErrorBoundary>
    )
}