import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { calculateStatistics } from "./HowManyHoursActions";

class Steps extends Component {
    constructor(props) {
        super(props);
        this.state = { hover: false, file: null, haveFile: false, rejectedFile: false };
    }

    onDragEnter() {
        this.setState({
            hover: true
        });
    }

    onDragLeave() {
        this.setState({
            hover: false
        });
    }

    //when a file is dropped into dropzone
    onDrop(file) {
        if (file[0] != null) {
            this.setState({ haveFile: true, file: file[0] });
        }
        else {
            this.setState({ haveFile: false });
        }
    }

    onDropRejected() {
        this.setState({ rejectedFile: true });
    }

    //render contents of the dropzone
    renderContents() {
        if (this.state.file != null) {
            return <p>{this.state.file.name}</p>;
        }
        else if (this.state.rejectedFile) {
            return <p>Please drop the NetflixViewingHistory.csv file</p>
        }
        else {
            return <p>or drop the downloaded file here</p>;
        }
    }

    //push to statistics page with file
    calculate() {
        if (this.state.haveFile) {
            this.props.calculateStats(this.state.file);
        }
    }

    render() {
        let dropzoneRef;
        return (
            <div className="howmanyhours-container pushFooter">
                <div className="howmanyhours">
                    <div className="howmanyhours-steps">
                        <h1>To calculate your stats we are going to need to get your Netflix viewing activity.</h1>
                        <h1>1. Click the link: <a className="key" onClick={this.copyScript} href="https://www.netflix.com/viewingactivity" target="_blank" rel="noopener noreferrer">https://www.netflix.com/viewingactivity</a></h1>
                        <h1>2. Make sure you have the right account chosen. (Click on the button at the top right to choose the correct account you want stats for). You may have to reopen the link above if you change accounts.</h1>
                        <h1>3. Scroll to the bottom of the page that you just opened at click on the 'Download All' button.</h1>
                        <h1>4. A file will download. Upload it using the form below, then press the calculate button to view your stats.</h1>
                    </div>
                    <div className="howmanyhours-upload">
                        <button className="howmanyhours-upload-button" classtype="file" type="button" onClick={() => { dropzoneRef.open(); }}>Upload</button>
                        <Dropzone
                            className={this.state.hover ? "dropzone hover" : "dropzone"}
                            multiple={false}
                            accept=".csv"
                            ref={(node) => { dropzoneRef = node; }}
                            onDrop={this.onDrop.bind(this)}
                            onDropRejected={this.onDropRejected.bind(this)}
                            onDragEnter={this.onDragEnter.bind(this)}
                            onDragLeave={this.onDragLeave.bind(this)}
                        >
                            {this.renderContents()}
                        </Dropzone>
                    </div>
                    <button onClick={this.calculate.bind(this)} className={this.state.haveFile ? "howmanyhours-button" : "howmanyhours-button howmanyhours-button-invalid"}>Calculate</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        calculateStats: bindActionCreators(calculateStatistics, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(Steps);