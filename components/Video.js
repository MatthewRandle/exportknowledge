import React, { Component } from "react";

import "../stylesheets/css/Video.css";

class Video extends Component {
    constructor() {
        super();
        this.state = { playVideo: false };
        this.playVideo = this.playVideo.bind(this);
    }

    playVideo() {
        this.setState({ playVideo: true });
    }

    render() {
        console.log(this.props.image)
        //if we have an image
        if (this.props.image != null && !this.state.playVideo) {
            return(
                <div className={this.props.className} style={{ background: "black", position: "relative" }} onClick={this.playVideo}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", position: "absolute" }}>
                        <img className="video_playButton" src="/static/play-button.svg" alt="Play Button" />
                    </div>
                    <img
                        src={this.props.image}
                        alt="Video Thumbnail"
                        className="video_thumbnail"
                    />
                </div>
            );
        }

        return (
            <iframe
                className={this.props.className}
                src={`https://www.youtube-nocookie.com/embed/${this.props.video}?autoplay=1&mute=1`}
            />
        );
    }
}

export default Video;