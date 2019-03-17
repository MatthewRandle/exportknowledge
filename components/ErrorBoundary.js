import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "../stylesheets/css/Error.css";

const clearError = () => dispatch => {
    dispatch({ type: "CLEAR_ERROR" });
};

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentWillUnmount() {
        this.props.clearError();
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error_container pushFooter">
                    <p>OOPS! Looks like something went wrong.</p>
                    <p>Please try again.</p>
                </div>
            );
        }
        else if (this.props.error) {
            if(this.props.error.fatalError) {
                return (
                    <div className="error_container pushFooter">
                        {this.props.error.code}
                        <p className="error_message">{this.props.error.customMessage || null}</p>
                    </div>
                );
            }
        }

        return this.props.children;
    }
}

function mapStateToProps({ error }) {
    return { error };
}

const mapDispatchToProps = dispatch => {
    return {
        clearError: bindActionCreators(clearError, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);