import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import "../stylesheets/css/ArticlePanel.css";
import "../stylesheets/css/ArticleSearch.css";
import "../stylesheets/css/Home.css";

import ArticleSearch from "../components/articleSearch";
import ErrorBoundary from "../components/ErrorBoundary";
import initialSetupFetch from "../utils/initialSetupFetch";
import { fetchAllTags, fetchAllArticles } from "../components/article/ArticleActions";
import { fetchLatestCourse } from "../components/course/CourseActions";

const Index = () => {
    const latestCourse = useSelector(state => state.course.latestCourse[0]);
    return(
        <ErrorBoundary>
            <div className="pushFooter">
                <div className="hero_container">
                    <div className="hero">
                        <div className="hero_content">
                            <h1>Learn and become a full stack</h1>
                            <h1>web developer for <span>FREE</span></h1>
                            <Link prefetch href="/courses">
                                <a className="hero_button"><p>START LEARNING</p></a>
                            </Link>

                            <a href="https://www.youtube.com/channel/UC3iSlUY21jsuKvDnosFYYUg?view_as=subscriber" target="_blank" rel="noopener noreferrer">
                                <img src="/static/youtube-logo-full.png" alt="Youtube" />
                            </a>
                        </div>
                        <img style={{ width: "700px" }} src="/static/hero.jpg" alt=""/>
                    </div>
                </div>

                <section className="featured_course_container">
                    <h2>Featured Course</h2>
                    <Link href={`/course/${latestCourse.course_url}/${latestCourse.part_url}`}>
                        <a>
                            <img className="home_course_image--blur" src={latestCourse.image} />
                            <img className="home_course_image" src={latestCourse.image} />
                        </a>
                    </Link>
                </section>

                <div className="articles_container">
                    <ArticleSearch />
                </div>
            </div>
        </ErrorBoundary>
    );
}

Index.getInitialProps = async function({ store, req }) {
    //if server side
    if (req) {
        await initialSetupFetch(store, req);
    }

    const state = store.getState();

    //if article state doesn't exist at all fetch both
    if(state.article == null) {
        await store.dispatch(fetchAllTags(req));
        await store.dispatch(fetchAllArticles(req));
    }
    else {
        if(state.article.tags == null)  {
            await store.dispatch(fetchAllTags(req));
        }

        if (state.article.all == null) {
            await store.dispatch(fetchAllArticles(req));
        }
    }
    
    if(state.course == null) {
        await store.dispatch(fetchLatestCourse(req));
    }
    else if(state.course.latestCourse == null) {
        await store.dispatch(fetchLatestCourse(req));
    }

    return {};
}

export default Index;