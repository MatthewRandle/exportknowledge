import React, { Component } from "react";
import Link  from "next/link";

import "../../stylesheets/css/Navbar.css";

class Navbar extends Component {
    render() {
        return (
            <div>
                <div className="navbar_container">
                    <div className="navbar">
                        <div className="navbar_left">
                            <Link prefetch href="/">                                
                                <a className="navbar_logo">
                                    <img src="/static/Logo.svg" alt="export Knowledge logo" />
                                    <p className="navbar_logo_title">export Knowledge;</p>
                                </a>
                            </Link>
                            <ul className="navbar_links">
                                <li><Link prefetch href="/"><a>home</a></Link></li>
                                <li><Link prefetch href="/courses"><a>courses</a></Link></li>
                            </ul>
                        </div>

                        <div className="accountSection_container" style={{ height: "55px" }}>
                            <div className="accountSection">
                                {this.props.accountSection}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ height: "55px" }} />
            </div>
        );
    }
}

export default Navbar;