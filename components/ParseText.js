import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

import Prism from "prismjs";
import "prismjs/components/prism-jsx.min";
import "prismjs/components/prism-json.min";
import "prismjs/components/prism-scss.min";
import "../stylesheets/css/OneDark.css";

import CodeGutter from "./CodeGutter.js";

export default class ParseText extends Component {
    componentDidMount() {
        Prism.highlightAll();
    }

    parse() {
        let textArray = this.props.text.split("<code>");
        let text = textArray.map((item, i) => {
            if (item.substring(0, 5) === "<pre>") {
                let pre = item.slice(5).trim();
                let type = "jsx"; //default
                let sliceLength = 5; //default

                if (pre.substring(1, 4) === "jsx") {
                    type = "jsx";
                    sliceLength = 5; //<jsx> is 5 characters
                }
                else if (pre.substring(1, 5) === "html") {
                    type = "html";
                    sliceLength = 6; //<html> is 6 characters
                }
                else if (pre.substring(1, 4) === "css") {
                    type = "css";
                    sliceLength = 5;
                }
                else if (pre.substring(1, 5) === "scss") {
                    type = "scss";
                    sliceLength = 6;
                }
                else if (pre.substring(1, 5) === "json") {
                    type = "json";
                    sliceLength = 6; //<json>
                }
                else if (pre.substring(1, 3) === "js") {
                    type = "javascript";
                    sliceLength = 4; //<js>
                }

                pre = pre.slice(sliceLength).trim();

                return (
                    <li key={i} className="code_pre_container">
                        <pre component="pre" className={`language-${type} pre`}>
                            <code>
                                {pre}
                            </code>
                        </pre>
                    </li>
                );
            }
            //if text is code
            else if (item.substring(0, 1) === "<") {
                let type;
                let sliceLength; //number that is length of identifier, example <jsx> will be length 5

                if(item.substring(1, 4) === "jsx") {                    
                    type = "jsx";
                    sliceLength = 5; //<jsx> is 5 characters
                }
                else if(item.substring(1, 5) === "html") {
                    type = "html";
                    sliceLength = 6; //<html> is 6 characters
                }
                else if(item.substring(1, 4) === "css") {
                    type = "css";
                    sliceLength = 5;
                }
                else if (item.substring(1, 5) === "scss") {
                    type = "scss";
                    sliceLength = 6;
                }
                else if (item.substring(1, 5) === "json") {
                    type = "json";
                    sliceLength = 6; //<json>
                }
                else if(item.substring(1, 3) === "js") {
                    type = "javascript";
                    sliceLength = 4; //<js>
                }

                const code = item.slice(sliceLength).trim();
                const lineNumbers = code.split(/\r\n|\r|\n/).length;

                return (
                    <li key={i} className="code_container">
                        <CodeGutter lineNumbers={lineNumbers} />
                        <pre className="code">
                            <code className={`language-${type}`}>
                                {`${code}`}
                            </code>
                        </pre>
                    </li>
                );
            }
            else {
                return <li key={i}>{ReactHtmlParser(item)}</li>;
            }
        });

        return text;
    }

    render() {
        return(
            <div style={{ display: "flex", flexDirection: "column" }}>
                {this.parse()}
            </div>
        );
    }
}

ParseText.propTypes = {
    text: PropTypes.string.isRequired
};