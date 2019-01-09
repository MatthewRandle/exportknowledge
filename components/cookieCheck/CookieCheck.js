import React from "react";

import "../../stylesheets/css/CookieBanner.css";

const CookieCheck = (props) => {
    return(
        <div className="cookieBanner_container">
            <div className="cookieBanner">
                <p>
                    This site uses cookies to provide you with the best experience. By accepting you agree
                    to our <span>Cookie Policy</span> and <span>Privacy Policy</span>
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