import React, { Component } from "react";
import Link from "next/link";

import "../../stylesheets/css/Footer.css";

export default class Footer extends Component {
    render() {
        return(
            <div className="footer_container">
                <div className="footer">
                    <div style={{ display: "flex", alignItems: "center", width: "100%" }} >  
                        <img src="/static/Logo.svg" className="footer_logo_image" alt="export Knowledge logo"/>  
                        
                        <div style={{ width: "100%" }}>
                            <p className="footer_logo">export Knowledge;</p>

                            <div className="footer_links">
                                <Link href="/terms-and-conditions"><a>Terms & Conditions</a></Link>
                                <Link href="/privacy-policy"><a>Privacy Policy</a></Link>
                                <Link href="/cookie-policy"><a>Cookie Policy</a></Link>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="footer_social_links">
                            <a href="https://github.com/exportknowledge" target="_blank" rel="noopener noreferrer">
                                <img src="/static/github-logo.png" alt="Follow us on Github" className="footer_github" />
                            </a>
                            <a href="https://www.youtube.com/channel/UC3iSlUY21jsuKvDnosFYYUg?view_as=subscriber" target="_blank" rel="noopener noreferrer">
                                <img className="footer_youtube"  src="/static/youtube-logo.png" alt="Follow us on YouTube" />
                            </a>
                            <a href="https://twitter.com/knowledgeexport" target="_blank" rel="noopener noreferrer">
                                <img src="/static/twitter-logo.png" alt="Follow us on Twitter" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}