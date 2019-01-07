import React from "react";

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

    await store.dispatch(fetchAllTags(req));    

    return {};
}

export default NewArticlePage;