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
                    <a className="hero_youtube" href="https://www.youtube.com/channel/UC3iSlUY21jsuKvDnosFYYUg?view_as=subscriber" target="_blank" rel="noopener noreferrer">
                        <img src="/static/youtube-logo-full.png" alt="Youtube" />
                    </a>
                    <div className="hero">
                        <div className="hero_content">
                            <h1>Learn and become a full stack <br/>
                            web developer for <span>FREE</span></h1>
                            <Link prefetch href="/courses">
                                <a className="hero_button"><p>START LEARNING</p></a>
                            </Link>
                        </div>
                        
                        <div className="hero_animation">
                            <CodeSVG />
                            <img src="/static/hero.svg" alt="Code Editor"/>
                        </div>
                    </div>
                </div>

                <section className="featured_course_container">
                    <h2>Featured Course</h2>
                    <Link href={`/course/${latestCourse.course_url}/${latestCourse.part_url}`}>
                        <a>
                            <img className="home_course_image--blur" src={latestCourse.image} alt="Course" />
                            <img className="home_course_image" src={latestCourse.image} alt="Course Blur" />
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

const CodeSVG = () => {
    return(
        <svg id="code" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 93">
            <title>code</title>
            <g id="group-1">
                <g id="line-1">
                    <rect className="dash-1" width="49" height="5" fill="#6eff9e" />
                </g>
                <g id="line-2">
                    <rect className="dash-1" y="8" width="25" height="5" fill="#ff8e79" />
                </g>
                <g id="line-3">
                    <rect className="dash-1" y="16" width="17" height="5" fill="#15d3ff" />
                    <rect className="dash-2" x="20" y="16" width="21" height="5" fill="#c617ff" />
                    <rect className="dash-3" x="44" y="16" width="53" height="5" fill="#ffff1a" />
                </g>
                <g id="line-4">
                    <rect className="dash-1" y="24" width="24" height="5" fill="#6eff9e" />
                    <rect className="dash-2" x="27" y="24" width="53" height="5" fill="#ff4a69" />
                    <rect className="dash-3" x="83" y="24" width="21" height="5" fill="#1a4bff" />
                </g>
                <g id="line-5">
                    <rect className="dash-1" y="40" width="73" height="5" fill="#15d3ff" />
                    <rect className="dash-2" x="76" y="40" width="25" height="5" fill="#c617ff" />
                </g>
                <g id="line-6">
                    <rect className="dash-1" y="48" width="32" height="5" fill="#1a4bff" />
                </g>
                <g id="line-7">
                    <rect className="dash-1" y="56" width="50" height="5" fill="#ff4a69" />
                </g>
                <g id="line-8">
                    <rect className="dash-1" y="64" width="24" height="5" fill="#c617ff" />
                    <rect className="dash-2" x="27" y="64" width="32" height="5" fill="#ff8e79" />
                </g>
                <g id="line-9">
                    <rect className="dash-1" y="80" width="43" height="5" fill="#15d3ff" />
                </g>
                <g id="line-10">
                    <rect className="dash-1" y="88" width="16" height="5" fill="#ffff1a" />
                </g>
            </g>
        </svg>
    )
}