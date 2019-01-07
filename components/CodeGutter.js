import React, { Component } from "react";

export default class CodeGutter extends Component {
    getLineNumbers() {
        try {
            let lineNumbers = [];
            for(let i = 0; i < this.props.lineNumbers; i++) {
                lineNumbers.push(<span key={i} />);
            }

            return lineNumbers;
        } 
        catch(err) {
            return;
        }
    }

    render(){
        return(
            <div className="code_gutter">
                {this.getLineNumbers()}
            </div>
        );
    }
}