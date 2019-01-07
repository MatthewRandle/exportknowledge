import React from "react";

import initialSetupFetch from "../../utils/initialSetupFetch";
import Admin from "../../components/admin";

const AdminPage = () => {
    return(
        <Admin />
    )
}

AdminPage.getInitialProps = async function ({ store, req, query }) {
    await initialSetupFetch(store, req);

    return {};
}

export default AdminPage;