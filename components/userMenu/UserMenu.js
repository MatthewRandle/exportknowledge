import React, { Component } from "react";

import "../../stylesheets/css/UserMenu.css";

class UserMenu extends Component {
    render() {
        return(
            <div className="userMenu_container" ref={this.props.refProp}>
                <img className="userMenu_icon" onClick={this.props.toggleMenu} src={this.props.userIcon} alt="Could not get profile picture" />
                {this.props.userMenu}
            </div>
        );
    }
}

export default UserMenu;