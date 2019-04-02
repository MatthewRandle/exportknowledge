import React, { Component } from "react";
import Navbar from "./Navbar";
import { connect } from "react-redux";

import OAuthButton from "../OAuthButton";
import UserMenu from "../userMenu";

class NavbarContainer extends Component {
    getAccountSection() {
        switch (this.props.user) {
            case null:
                return <OAuthButton />;
            case false:
                return <OAuthButton />;
            default:
                return <UserMenu />;
        }
    }

    render() {
        return (
            <Navbar
                accountSection={this.getAccountSection()}
            />
        );
    }
}

function mapStateToProps({ user }) {
    return { user };
}

export default connect(mapStateToProps)(NavbarContainer);