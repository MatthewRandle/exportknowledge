import React from "react";
import Head from "next/head";

import "../stylesheets/css/Legal.css";

import CookiePolicy from "../components/legal/CookiePolicy";
import ErrorBoundary from "../components/ErrorBoundary";

export default () => {
    return (
        <ErrorBoundary>
            <Head>
                <link rel="canonical" href="https://exportknowledge.com/cookie-policy" />
                <title>Cookie Policy - export Knowledge;</title>
                <meta name="description" content="Cookie policy for export Knowledge detailing was cookies we use and how they affect the user." />
            </Head>
            <CookiePolicy />
        </ErrorBoundary>
    )
}