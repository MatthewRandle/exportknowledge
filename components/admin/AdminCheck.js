import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "next/router";

import { isAdmin } from "./AdminActions";

class AdminCheck extends Component {
    componentDidMount() {
        this.props.isAdmin();
    }

    render() {
        if(this.props.user) {
            if (this.props.admin) {
                if (this.props.admin.authorised === true) {
                    return (
                        <div>{this.props.children}</div>
                    );
                }
                else if (this.props.admin.authorised === false) {
                    //user isnt admin so redirect
                    return <div onLoad={this.props.router.push("/")}></div>
                }
            }
            else {
                return <div onLoad={this.props.router.push("/")}></div>
            }
        }        

        return <div onLoad={this.props.router.push("/")}></div>
    }
}

function mapStateToProps({ admin, user }) {
    return (
        { admin, user }
    );
}

const mapDispatchToProps = dispatch => {
    return {
        isAdmin: bindActionCreators(isAdmin, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminCheck));