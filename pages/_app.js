import React from 'react'
import App, { Container } from 'next/app';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import reduxThunk from "redux-thunk";
import Head from "next/head";
import Router from "next/router";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

import rootReducer from "../utils/rootReducer";
import "../stylesheets/css/App.css";
import "../static/empty.css";

const makeStore = (initialState, options) => {
    return createStore(rootReducer, initialState, applyMiddleware(reduxThunk));
};

class MyApp extends App {
    render() {
        const { Component, pageProps, store } = this.props

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
}

export default withRedux(makeStore)(MyApp);