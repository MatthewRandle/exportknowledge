import React, { Component } from "react";
import { connect } from "react-redux";

import Steps from "./Steps";
import Statistics from "./Statistics";

class HowManyHours extends Component {
    constructor() {
        super();
        this.renderMostInADay = this.renderMostInADay.bind(this);
    }

    renderMostInADay() {
        let mostFormatted = this.props.statistics.most.mostNames.map((item, i) => {
            return (
                <p key={i}>{item[0]} <span>{item[1]}</span> {item[1] === 1 ? "time" : "times"} </p>
            );
        });

        return mostFormatted;
    }

    render() {
        if (this.props.statistics) {
            if (this.props.statistics.movieStats && this.props.statistics.tvShowStats && this.props.statistics.most) {
                return (
                    <Statistics 
                        movieStats={this.props.statistics.movieStats}
                        tvShowStats={this.props.statistics.tvShowStats}
                        most={this.props.statistics.most}
                        renderMostInADay={this.renderMostInADay}
                    />
                )
            }
            else if (this.props.statistics.status !== null) {
                return (
                    <p>{this.props.statistics.status}</p>
                )
            }
        }

        return (
            <Steps />
        );   
    }
}

function mapStateToProps({ statistics }) {
    return (
        { statistics }
    );
}

export default connect(mapStateToProps)(HowManyHours);