import React from 'react'
import App, { Container } from 'next/app';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import reduxThunk from "redux-thunk";
import Head from "next/head";
/* const { detect } = require('detect-browser'); */

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import rootReducer from "../utils/rootReducer";
import "../stylesheets/css/App.css";
import "../static/empty.css";

const makeStore = (initialState, options) => {
    return createStore(rootReducer, initialState, applyMiddleware(reduxThunk));
};

class MyApp extends App {
    constructor() {
        super();
        this.state = { browserSupported: true };
    } 

    /* componentDidMount() {
        const browser = detect();
        if(browser.name === "ie") {
            this.setState({ browserSupported: false });
        }
    } */

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
                                <link href="https://fonts.googleapis.com/css?family=Open+Sans|Zilla+Slab:400,700" rel="stylesheet" />
                                <meta name="google-site-verification" content="LvIOdKgCzT_ISjQsQi-NWphkCMSMS4rRmN_cN5qPHUI" />
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                <title>export Knowledge;</title>
                            </Head>

                            <Navbar />

                            <Component {...pageProps} />

                            <Footer />
                        </div>
                    </Provider>
                </Container>
            )
        }
        else {
            return(
                <div>hnotrgjesoifhnieso</div>
            )
        }
    }
}

export default withRedux(makeStore)(MyApp);