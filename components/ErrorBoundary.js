import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
                <div style={{ height: "800px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h1>OOPS! Looks like something went wrong. Please try again later.</h1>
                </div>
            );
        }
        else if (this.props.error) {
            return (
                <div style={{ height: "800px", display: "flex", flexDirection: "column" ,justifyContent: "center", alignItems: "center" }}>
                    <h1>Request failed with status code {this.props.error.code}</h1>
                    <h1>{this.props.error.customMessage || null}</h1>                    
                </div>
            );
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