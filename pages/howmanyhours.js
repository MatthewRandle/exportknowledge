import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import "../stylesheets/css/HowManyHours.css";

import ErrorBoundary from "../components/ErrorBoundary";
import initialSetupFetch from "../utils/initialSetupFetch";
import HomeLoader from "../components/home/HomeLoader";
import HowManyHours from "../components/howmanyhours";

const HowManyHoursPage = () => {
    return (
        <ErrorBoundary>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:700" rel="stylesheet"></link>
            </Head>

            <HowManyHours />
        </ErrorBoundary>
    );
}

HowManyHoursPage.getInitialProps = async function ({ store, req }) {
    await initialSetupFetch(store, req);

    return {};
}

export default HowManyHoursPage;