import React from "react";

import { fetchAllArticles } from "../../components/admin/AdminActions";
import initialSetupFetch from "../../utils/initialSetupFetch";
import Admin from "../../components/admin";

const AdminArticlePage = () => {
    return (
        <Admin />
    )
}

AdminArticlePage.getInitialProps = async function ({ store, req }) {
    await initialSetupFetch(store, req);

    await store.dispatch(fetchAllArticles(req));

    return {};
}

export default AdminArticlePage;