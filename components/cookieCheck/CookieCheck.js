import React from "react";
import Link from "next/link";

import "../../stylesheets/css/CookieBanner.css";

const CookieCheck = (props) => {
    return(
        <div className="cookieBanner_container">
            <div className="cookieBanner">
                <p>
                    This site uses cookies to provide you with the best experience. By accepting you agree
                    to our <Link href="/cookie-policy"><a>Cookie Policy</a></Link> and <Link href="/privacy-policy"><a>Privacy Policy</a></Link>
                </p>

                <div className="cookieBanner_buttons">
                    <button onClick={props.decline}>Decline</button>
                    <button onClick={props.accept}>Accept</button>
                </div>
            </div>
        </div>
    )
}

export default CookieCheck;