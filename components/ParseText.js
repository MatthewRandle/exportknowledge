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

    getTypeAndSliceLength(item) {
        let name = "jsx";
        let sliceLength = 5;

        if (item.substring(1, 4) === "jsx") {
            name = "jsx";
            sliceLength = 5; //<jsx> is 5 characters
        }
        else if (item.substring(1, 5) === "html") {
            name = "html";
            sliceLength = 6; //<html> is 6 characters
        }
        else if (item.substring(1, 4) === "css") {
            name = "css";
            sliceLength = 5;
        }
        else if (item.substring(1, 5) === "scss") {
            name = "scss";
            sliceLength = 6;
        }
        else if (item.substring(1, 5) === "json") {
            name = "json";
            sliceLength = 6; //<json>
        }
        else if (item.substring(1, 3) === "js") {
            name = "javascript";
            sliceLength = 4; //<js>
        }

        return { name, sliceLength };
    }

    parse() {
        let textArray = this.props.text.split("<code>");
        let text = textArray.map((item, i) => {
            if (item.substring(0, 5) === "<pre>") {
                let pre = item.slice(5).trim();

                let language = this.getTypeAndSliceLength(pre);

                pre = pre.slice(language.sliceLength).trim();

                return (
                    <li key={i} className="code_pre_container">
                        <pre component="pre" className={`language-${language.name} pre`}>
                            <code>
                                {pre}
                            </code>
                        </pre>
                    </li>
                );
            }
            //if text is code
            else if (item.substring(0, 1) === "<") {
                let language = this.getTypeAndSliceLength(item);

                let code = item.slice(language.sliceLength).trim();
                let filename;

                if(code.substring(0, 10) === "<filename>") {
                    code = code.slice(10).trim(); //remove <filename>
                    filename = code.split('\n')[0]; //get filename
                    code = code.slice(filename.length).trim(); //once got filename, remove it from code
                }                

                const lineNumbers = code.split(/\r\n|\r|\n/).length;

                return (
                    <li key={i} className="code_container">
                        { filename != null ? <p className="code_filename">{filename}</p> : null }
                        <CodeGutter lineNumbers={lineNumbers} />
                        <pre className="code">
                            <code className={`language-${language.name}`}>
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