import React, { Component } from "react";

import "../stylesheets/css/OAuthButton.css";

class OAuthButton extends Component {	
	render() {
		return (
			<a className="oauthButton_container" href={"/auth/github"}>
				<img src="/static/github-logo.png" className="oauthButton_logo" alt="not found" /> {/* TODO: add proper alt tag */}
				<p className={"oauthButton_text"}>Sign in with GitHub</p>
			</a>
		);
	}
}

export default OAuthButton;