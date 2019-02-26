import React from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";

class CoursePartPanel extends React.Component {
    constructor() {
        super();
        this.state = { parentWidth: 0, textWidth: 0 };
    }

    titleContainerRef = element => {
       if(element) {
           this.setState({ parentWidth: element.clientWidth });
       }
    }

    titleRef = element => {
        if (element) {
            this.setState({ textWidth: element.clientWidth });
        }
    }

    getWidthToMove() {
        let amountToMove = this.state.parentWidth - this.state.textWidth;
        if (amountToMove < 0) {
            return amountToMove;
        }
        else {
            return 0;
        }
    }

    render() {
        return (
            <Link
                href={
                    this.props.onAdminPage ?
                        { pathname: "/admin/edit/course/part", query: { courseURL: this.props.courseURL, partURL: this.props.partURL } }
                        : { pathname: "/course/part", query: { courseURL: this.props.courseURL, partURL: this.props.partURL } }
                }
                as={
                    this.props.onAdminPage ?
                        `/admin/edit/course/part/${this.props.courseURL}/${this.props.partURL}`
                        : `/course/${this.props.courseURL}/${this.props.partURL}`
                }
            >
                <a className="coursePartPanel_container">
                    <div className="coursePartPanel_part"><p>{this.props.part}</p></div>
                    <div className="coursePartPanel_title" ref={this.titleContainerRef}>
                        <SlidingText amount={this.getWidthToMove()} ref={this.titleRef}>{this.props.title}</SlidingText>
                    </div>
                    <div className="coursePartPanel_open"><p>></p></div>
                </a>
            </Link>
        );
    }
}

const slideText = (amount) => keyframes`
    0% {
        transform: translateX(0px);
    }

    25% {
        transform: translateX(0px);
    }

    75% {
        transform: translateX(${amount}px);
    }

    100% {
        transform: translateX(${amount}px);
    }
`;

const SlidingText = styled.p`
    animation: ${props => slideText(props.amount)} 3s linear infinite;
`;

export default CoursePartPanel;