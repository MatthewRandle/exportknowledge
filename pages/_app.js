import React from 'react'
import App, { Container } from 'next/app';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import reduxThunk from "redux-thunk";
import Head from "next/head";
const { detect } = require('detect-browser');
import AOS from "aos";
import "aos/dist/aos.css";

import GoogleAnalytics, { init } from "../components/GoogleAnalytics";
import CookieCheck from "../components/cookieCheck";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

import rootReducer from "../utils/rootReducer";
import "../stylesheets/css/App.css";
import "../stylesheets/css/Global.css";
import "../stylesheets/css/Footer.css";
import "../stylesheets/css/Navbar.css";

const makeStore = (initialState, options) => {
    return createStore(rootReducer, initialState, applyMiddleware(reduxThunk));
};

class MyApp extends App {
    constructor() {
        super();
        this.state = { browserSupported: true };
    } 

    componentDidMount() {
        init();
        AOS.init();
        const browser = detect();
        if(browser.name === "ie") {
            this.setState({ browserSupported: false });
        }
    }

    render() {        
        const { Component, pageProps, store } = this.props

        if(this.state.browserSupported) {
            return (
                <Container>
                    <Provider store={store}>
                        <div className="app">
                            {process.env.NODE_ENV !== 'production' && (
                                <link rel="stylesheet" type="text/css" href={'/_next/static/css/styles.chunk.css?v=' + Date.now()} />
                            )}

                            <Head>
                                <link href="https://fonts.googleapis.com/css?family=Roboto+Slab|Zilla+Slab:400,700" rel="stylesheet" />
                                <link rel="canonical" href="https://exportknowledge.com" />
                                <meta name="google-site-verification" content="LvIOdKgCzT_ISjQsQi-NWphkCMSMS4rRmN_cN5qPHUI" />
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                <title>export Knowledge - Become a full stack web developer for free</title>
                                <meta name="description" content="exort Knowledge is a place where anyone can learn how to become a full stack web developer for free. Including courses of multiple parts and topics that each have a written and video format." />
                            </Head>

                            <Navbar />
                            <CookieCheck><GoogleAnalytics /></CookieCheck>

                            <Component {...pageProps} />

                            <Footer />
                        </div>
                    </Provider>
                </Container>
            )
        }
        else {
            return(
                <div className="app">
                    {process.env.NODE_ENV !== 'production' && (
                        <link rel="stylesheet" type="text/css" href={'/_next/static/css/styles.chunk.css?v=' + Date.now()} />
                    )}

                    <Head>
                        <link href="https://fonts.googleapis.com/css?family=Open+Sans|Zilla+Slab:400,700" rel="stylesheet" />
                        <meta name="google-site-verification" content="LvIOdKgCzT_ISjQsQi-NWphkCMSMS4rRmN_cN5qPHUI" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>export Knowledge;</title>
                    </Head>

                    <Navbar />

                    <div className="pushFooter error_container">
                        <p>Please switch to another browser, the one you're using is not supported by this site.</p>
                    </div>

                    <Footer />
                </div>
            )
        }
    }
}

export default withRedux(makeStore)(MyApp);