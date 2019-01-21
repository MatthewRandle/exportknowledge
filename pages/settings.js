import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

import "../stylesheets/css/Settings.css";

import ErrorBoundary from "../components/ErrorBoundary";
import initialSetupFetch from "../utils/initialSetupFetch";
import { getUserSettings } from "../components/settings/SettingsActions";

const Settings = dynamic(import("../components/settings"));

const SettingsPage = () => {
    return (
        <ErrorBoundary>
            <Head>
                <title>Settings - export Knowledge;</title>
            </Head>

            <Settings />
        </ErrorBoundary>
    );
}

SettingsPage.getInitialProps = async function ({ store, req }) {
    //if server side
    if (req) {
        await initialSetupFetch(store, req);
    }

    await store.dispatch(getUserSettings(req));

    return {};
}

export default SettingsPage;