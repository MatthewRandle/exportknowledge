import React from "react";

import { isAdmin } from "../../../components/admin/AdminActions";
import { fetchAllTags } from "../../../components/article/ArticleActions";
import initialSetupFetch from "../../../utils/initialSetupFetch";
import EditArticle from "../../../components/admin/editArticle";

const NewArticlePage = () => {
    return (
        <EditArticle />
    )
}

NewArticlePage.getInitialProps = async function ({ store, req }) {
    await initialSetupFetch(store, req);
    await store.dispatch(isAdmin(req));

    const state = store.getState();

    if (state.admin) {
        if (state.admin.authorised) {
            await store.dispatch(fetchAllTags(req)); 

            return {};
        }
    }

    res.writeHead(301, {
        Location: "/"
    })
    res.end();  
}

export default NewArticlePage;