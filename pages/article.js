import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import Link from "next/link";

import "../stylesheets/css/Article.css";
import "../stylesheets/css/Code.css";
import "../stylesheets/css/CommentSection.css";

import ErrorBoundary from "../components/ErrorBoundary";
import initialSetupFetch from "../utils/initialSetupFetch";
import { fetchArticle } from "../components/article/ArticleActions";
import CommentSection from "../components/commentSection";
import { clearArticle } from "../components/article/ArticleActions";
import { clearComment } from "../components/comment/CommentActions";
import ParseText from "../components/ParseText";
import Video from "../components/Video";

const ArticlePage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        return() => {
            dispatch(clearArticle());
            dispatch(clearComment());
        }
    })

    const article = useSelector(state => state.article.selectedArticle);
    const prerequisites = useSelector(state => state.article.selectedArticlesPrerequisites);
    const furtherReading = useSelector(state => state.article.selectedArticlesFurtherReading);

    return(
        <ErrorBoundary>   
            <Head>
                <title>{article.title} - export Knowledge;</title>
            </Head>

            <div className="article_container pushFooter">                
                {article.video !== null ?
                    <Video
                        className="article_image"
                        video={article.video}
                        image={article.image}
                    />
                    : <img className="article_image" src={article.image} alt="" />
                }               

                <div className="article">
                    <h1>{article.title}</h1>
                    {/* Render prerequisites if they exist */}
                    {prerequisites.length > 0 ?
                        <div>
                            <div className="article_prerequisites_container">
                                <h2>Prerequisites</h2>
                                {prerequisites.map((item , i) => {
                                    return <p key={i}>{item.title} - Available <Link href={item.url}><a className="article_prerequisites_available">here</a></Link></p>
                                })}
                            </div>

                            <div className="article_lineBreak" />
                        </div>
                        : null
                    }

                    <ul className="article_text_container">
                        <ParseText text={article.text} />
                    </ul>

                    {furtherReading.length > 0 ?
                        <div className="article_prerequisites_container">
                            <div>
                                <h2>Further Reading</h2>
                                {furtherReading.map((item, i) => {
                                    return <p key={i}>{item.title} - Available <Link href={item.url}><a className="article_prerequisites_available">here</a></Link></p>
                                })}
                            </div>
                        </div>
                        : null
                    }
                </div>

                {/* Only render comments section when we have article */}
                {article.id ?
                    <div className="article_commentSection">
                        <CommentSection articleID={article.id} courseID={null} />
                    </div>
                    : null
                }
            </div>
        </ErrorBoundary>
    );
}

ArticlePage.getInitialProps = async function ({ store, req, query, asPath }) {
    //if server side
    if(req) {
        await initialSetupFetch(store, req);
    }

    const state = store.getState();    
    
    if(state.article == null) {
        await store.dispatch(fetchArticle(query.url, req));
    }
    else if(state.article.selectedArticle == null) {
        await store.dispatch(fetchArticle(query.url, req));
    }

    return {};
}

export default ArticlePage;