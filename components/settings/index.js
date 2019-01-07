import React, { Component } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "next/router";

import { updateUserSettings } from "./SettingsActions";
import Settings from "./Settings";
import SettingsLoader from "./SettingsLoader";

class SettingsContainer extends Component {
    constructor() {
        super();
        this.state = { cookieChoice: false };
        this.confirmDeleteUser = this.confirmDeleteUser.bind(this);
        this.toggleCookieChoice = this.toggleCookieChoice.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        if(this.props.settings.userSettings.accepts_cookies === -1) {
            this.setState({ cookieChoice: 0 });
        }
        else {
            this.setState({ cookieChoice: this.props.settings.userSettings.accepts_cookies });
        }
    }

    componentWillReceiveProps(newProps) {
        if(newProps.settings) {
            if(newProps.settings.userSettings) {
                if(newProps.settings.userSettings.accepts_cookies === -1 ) {
                    this.setState({ cookieChoice: 0 });
                }
                else {
                    this.setState({ cookieChoice: newProps.settings.userSettings.accepts_cookies });
                }
            }
        }
    }

    confirmDeleteUser() {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui settings_alert'>
                        <div>
                            <h1>Are you sure?</h1>
                            <p>You want to delete your account permanently?</p>
                        </div>
                        
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <button onClick={onClose}>No</button>
                            <button onClick={() => {
                                this.deleteUser();
                                onClose();
                            }}>
                                Yes, Delete it!
                        </button>
                        </div>
                    </div>
                );
            }
        });
    }

    toggleCookieChoice() {
        this.setState({ cookieChoice: !this.state.cookieChoice });
    }
    
    submit(cookieChoice) {
        this.props.updateUserSettings(cookieChoice);
    }

    deleteUser() {
        
    }

    render() {           
        if(this.props.settings) {
            if(this.props.settings.redirect === true) {
                return (
                    <Settings
                        onClick={this.props.router.push("/")}
                        delete={this.confirmDeleteUser}
                        cookieChoice={!this.state.cookieChoice}
                        toggleCookieChoice={this.toggleCookieChoice}
                        submit={this.submit}
                        forename={this.props.settings.userSettings.forename}
                        surname={this.props.settings.userSettings.surname}
                        email={this.props.settings.userSettings.email}
                    />
                )
            }

            if (this.props.settings.userSettings) {
                return (
                    <Settings
                        delete={this.confirmDeleteUser}
                        cookieChoice={this.state.cookieChoice}
                        toggleCookieChoice={this.toggleCookieChoice}
                        submit={this.submit}
                        forename={this.props.settings.userSettings.forename}
                        surname={this.props.settings.userSettings.surname}
                        email={this.props.settings.userSettings.email}
                    />
                );
            }           
       }

       return <SettingsLoader />;
    }
}

function mapStateToProps({ settings }) {
    return { settings };
}

const mapDispatchToProps = dispatch => {
    return {
        updateUserSettings: bindActionCreators(updateUserSettings, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsContainer));