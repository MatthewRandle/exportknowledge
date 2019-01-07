import React from "react";
import { Formik, Field } from "formik";

import "../../stylesheets/css/Settings.css";

const Settings = (props) => {
    return(
        <div className="settings_container pushFooter">
            <div className="settings">
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        cookieChoice: props.cookieChoice || 0
                    }}
                    onSubmit={(values) => {
                        props.submit(values.cookieChoice);
                    }}
                    render={({
                        values,
                        handleSubmit
                    }) => (
                        <form autoComplete="off" onSubmit={handleSubmit}>
                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                                    <p>Allow Cookies</p>
                                    <input type="checkbox" className="settings_checkbox" checked={values.cookieChoice} onChange={props.toggleCookieChoice} />
                                </div>

                                <p>Forename</p>
                                <Field
                                    className="settings_input"
                                    name="forename"
                                    value={props.forename}
                                    disabled
                                />

                                <p>Surname</p>
                                <Field
                                    className="settings_input"
                                    name="surname"
                                    value={props.surname}
                                    disabled
                                />

                                <p>Email</p>
                                <Field
                                    className="settings_input"
                                    name="email"
                                    value={props.email}
                                    disabled
                                />

                                <p style={{ fontSize: "0.6rem", fontFamily: "Open Sans" }}>
                                    To change your forename, surname or email - logout and go to your GitHub account and update your settings then log back in.
                                </p>
                            </div>

                            <div className="settings_buttons">
                                <button type="submit">
                                    Save
                                </button>

                                <button onClick={() => props.delete()}>
                                    Delete Account
                                </button>
                            </div>
                        </form>
                    )}
                />
            </div>
        </div>
    );
}

export default Settings;