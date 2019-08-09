import React, { Component } from "react";
import Link  from "next/link";

class Navbar extends Component {
    render() {
        return (
            <div className="navbar_container">
                <div className="navbar">
                    <Link href="/">
                        <a className="navbar_logo">
                            <img src="/static/Logo.svg" alt="export Knowledge logo" />
                            <p className="navbar_logo_title">export Knowledge;</p>
                        </a>
                    </Link>

                    <div className="navbar_links">
                        <Link href="/courses">
                            <a className="navbar_link"><p>courses</p></a>
                        </Link>
                    </div>

                    <div className="accountSection_container" style={{ height: "55px" }}>
                        <div className="accountSection">
                            {this.props.accountSection}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;