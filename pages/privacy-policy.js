import React from "react";
import Head from "next/head";

import "../stylesheets/css/Legal.css";
import PrivacyPolicy from "../components/legal/PrivacyPolicy";
import ErrorBoundary from "../components/ErrorBoundary";

export default () => {
    return (
        <ErrorBoundary>
            <Head>
                <link rel="canonical" href="https://exportknowledge.com/privacy-policy" />
                <title>Privacy Policy - export Knowledge;</title>
                <meta name="description" content="Privacy Policy for export Knowledge detailing how you (the user) uses our site and what information we may gather." />
            </Head>
            <PrivacyPolicy />
        </ErrorBoundary>
    )
}