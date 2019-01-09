import React, { Component } from "react";
import Router, { withRouter } from "next/router";
import ReactGA from "react-ga";

class GoogleAnalytics extends Component {
    constructor() {
        super();
        this.state = { lastURL: "" };
        this.logPageChange = this.logPageChange.bind(this);
    }

    componentDidMount() {
        Router.onRouteChangeComplete = url => {
            if(url !== this.state.lastURL) {
                this.logPageChange(this.props.router.asPath);
                this.setState({ lastURL: this.props.router.asPath });
            }            
        }        

        this.setState({ lastURL: this.props.router.asPath });
    }

    logPageChange(asPath) {
        const { location } = window;
        ReactGA.set({
            asPath,
            location: `${location.origin}${asPath}`,
            ...this.props.options
        });

        ReactGA.pageview(asPath)
    }

    render() {
        return <div></div>;
    }
}

export const init = (options = {}) => {
    ReactGA.initialize(
        "UA-124508745-1", {
            debug: false,
            ...options
        }
    );

    return true;
};

export default withRouter(GoogleAnalytics);