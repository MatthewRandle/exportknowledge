import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";

import UserMenu from "./UserMenu";

class UserMenuContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { showUserMenu: false };

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.toggleUserMenu = this.toggleUserMenu.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mouseup", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.handleClickOutside);
    }

    /**
     * Set the wrapper ref
     */
    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    /**
     * Alert if clicked on outside of element
     */
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.closeUserMenu();
        }
    }

    renderUserName() {
        if (this.props.user) {
            return <p className="userMenu_name">{this.props.user.forename} {this.props.user.surname}</p>;
        }
    }

    closeUserMenu() {
        this.setState({ showUserMenu: false });
    }

    toggleUserMenu() {
        this.setState({ showUserMenu: !this.state.showUserMenu });
    }

    renderUserMenu() {
        switch (this.state.showUserMenu) {
            case true:
                return (
                    <div className="userMenu" >
                        <Link prefetch href="/settings"><a onClick={this.toggleUserMenu}>Manage Account</a></Link>
                        <a className="userMenu_logout" href="/api/logout">Logout</a>
                    </div>
                );
            default:
                return;
        }
    }

    render() {
        if(this.props.userMenu) {
            if(this.props.userMenu.userIcon) {
                return <UserMenu
                    refProp={this.setWrapperRef}
                    toggleMenu={this.toggleUserMenu}
                    userMenu={this.renderUserMenu()}
                    userIcon={this.props.userMenu.userIcon}
                />;
            }
        }

        return <div>loading</div>;
    }
}

function mapStateToProps({ userMenu }) {
    return { userMenu };
}

export default connect(mapStateToProps)(UserMenuContainer);