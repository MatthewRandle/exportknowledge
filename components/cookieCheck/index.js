import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { setCookieChoice } from "./CookieActions";
import CookieCheck from  "./CookieCheck";

class CookieCheckContainer extends Component {
    constructor() {
        super();
        this.state = { showBanner: false, allowCookies: false };
        this.decline = this.decline.bind(this);
        this.accept = this.accept.bind(this);
    }

    componentDidMount() {
        if(this.props.cookie) {
            if(this.props.cookie.userAllowsCookies === false) {
                this.setState({ showBanner: false, allowCookies: false });
            }
            else if(this.props.cookie.userAllowsCookies === true) {
                this.setState({ showBanner: false, allowCookies: true });
            }
            else {
                this.setState({ showBanner: true, allowCookies: false });
            }
        }
        else {
            var match = document.cookie.match(new RegExp('(^| )' + "acceptsEKCookies" + '=([^;]+)'));
            if (match) {
                this.setState({ showBanner: false, allowCookies: true });
            }
            else {
                this.setState({ showBanner: true, allowCookies: false });
            }
        }
    }

    decline() {
        this.props.setCookieChoice(0);
        this.setState({ allowCookies: false, showBanner: false });
    }

    accept() {
        this.props.setCookieChoice(1);
        this.setState({ allowCookies: true, showBanner: false });
    }

    render() {
        if(this.state.showBanner) {
            return (
                <CookieCheck
                    decline={this.decline}
                    accept={this.accept}
                />
            )
        }
        else if(this.state.allowCookies) {
            return <div>{this.props.children}</div>
        }

        return <div style={{ display: "none" }}></div>;
    }
}

function mapStateToProps({ user, cookie }) {
    return { user, cookie };
}

const mapDispatchToProps = dispatch => {
    return {
        setCookieChoice: bindActionCreators(setCookieChoice, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CookieCheckContainer);