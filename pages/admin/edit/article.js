import React from "react";

import { fetchAllArticles, fetchArticle, isAdmin } from "../../../components/admin/AdminActions";
import { fetchAllTags, } from "../../../components/article/ArticleActions";
import initialSetupFetch from "../../../utils/initialSetupFetch";
import EditArticle from "../../../components/admin//editArticle";

const EditArticlePage = (props) => {
    return (
        <EditArticle url={props.url} />
    )
}

EditArticlePage.getInitialProps = async function ({ store, req, query }) {
    await initialSetupFetch(store, req);
    await store.dispatch(isAdmin(req));

    const state = store.getState();

    if (state.admin) {
        if (state.admin.authorised) {
            await store.dispatch(fetchAllTags(req));
            await store.dispatch(fetchAllArticles(req));
            await store.dispatch(fetchArticle(query.url, req))

            return { url: query.url };
        }
    }

    res.writeHead(301, {
        Location: "/"
    })
    res.end();
}

export default EditArticlePage;