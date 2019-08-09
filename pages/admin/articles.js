import { useSelector } from "react-redux";
import { withRouter } from "next/router";

import { fetchAllArticles, isAdmin, reset } from "../../components/admin/AdminActions";
import ArticlePanel from "../../components/articlePanel";
import initialSetupFetch from "../../utils/initialSetupFetch";

import "../../stylesheets/css/ArticlePanel.css";
import "../../stylesheets/css/ArticleSearch.css";

const AdminArticlePage = ({ router }) => {
    const articles = useSelector(state => state.admin.allArticles);
    if(articles) {
        return (
            <div className="articleSearch pushFooter" style={{ marginTop: "100px" }}>
                <div className="articleSearch_articles">
                    <div key={-1} className="admin_new" onClick={() => router.push("/admin/new/article")}>+</div>

                    {articles.map((item, i) => {
                        return <ArticlePanel
                            title={item.title}
                            image={item.image}
                            url={item.url}
                            exists={item.exists}
                            key={i}
                            timestamp={item.timestamp}
                            admin={true}
                            text_preview={item.text_preview}
                        />
                    })}
                </div>
            </div>
        )
    }
    else {
        return <div className="pushFooter" style={{ marginTop: "100px" }}>Cant Load Articles</div>;
    }
}

AdminArticlePage.getInitialProps = async function ({ store, req }) {
    await initialSetupFetch(store, req);
    await store.dispatch(isAdmin(req));

    const state = store.getState();

    if (state.admin) {
        if (state.admin.authorised) {
            await store.dispatch(fetchAllArticles(req));
            await store.dispatch(reset());

            return {};
        }
    }

    res.writeHead(301, {
        Location: "/"
    })
    res.end();
}

export default withRouter(AdminArticlePage);