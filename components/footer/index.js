import React, { Component } from "react";
import Link from "next/link";

import "../../stylesheets/css/Footer.css";

export default class Footer extends Component {
    render() {
        return(
            <div className="footer_container">
                <div className="footer">
                    <div className="footer_info">
                        <div className="footer_logo">
                            <img src="/static/Logo.svg" alt="export Knowledge logo" />
                            <h2>export Knowledge;</h2>
                        </div>
                        <p>Want to hire me to make a website for you? Get in contact with me through the social media links to the right
                        or contact me through <a href="https://misterweb.dev" target="_blank" rel="noopener noreferrer">https://misterweb.dev</a>
                        </p>
                    </div>

                    <div className="footer_links">
                        <h2>Legal Jazz</h2>
                        <Link href="/terms-and-conditions"><a>Terms & Conditions</a></Link>
                        <Link href="/privacy-policy"><a>Privacy Policy</a></Link>
                        <Link href="/cookie-policy"><a>Cookie Policy</a></Link>
                    </div>

                    <div className="footer_social">
                        <a href="https://github.com/MatthewRandle" target="_blank" rel="noopener noreferrer">
                            <img src="/static/github-logo.png" alt="Follow us on Github" className="footer_github" />
                        </a>
                        <a href="https://www.youtube.com/channel/UC3iSlUY21jsuKvDnosFYYUg?view_as=subscriber" target="_blank" rel="noopener noreferrer">
                            <img src="/static/youtube-logo.png" alt="Follow us on YouTube" />
                        </a>
                        <a href="https://twitter.com/knowledgeexport" target="_blank" rel="noopener noreferrer">
                            <img src="/static/twitter-logo.png" alt="Follow us on Twitter" />
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}