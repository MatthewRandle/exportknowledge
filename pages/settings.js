import React from "react";
import dynamic from "next/dynamic";

import "../stylesheets/css/Settings.css";

import ErrorBoundary from "../components/ErrorBoundary";
import initialSetupFetch from "../utils/initialSetupFetch";
import { getUserSettings } from "../components/settings/SettingsActions";
import SettingsLoader from "../components/settings/SettingsLoader";

const Settings = dynamic(import("../components/settings"), { loading: () => <SettingsLoader /> });

const SettingsPage = () => {
    return (
        <ErrorBoundary>
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