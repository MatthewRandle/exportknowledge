import axios from "axios";

import errorHandler from "../../utils/actionErrorHandler";
import getRouteString from "../../utils/getRouteString";

export const GET_USER_SETTINGS = "GET_USER_SETTINGS";
export const UPDATE_SETTINGS_SUCCESS = "UPDATE_SETTINGS_SUCCESS";
export const DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS";

export const getUserSettings = (req) => async dispatch => {
    try {
        const res = await axios.post(getRouteString("/api/get-user-settings", req), { user: req ? req.user : null });

        dispatch({ type: GET_USER_SETTINGS, payload: { userSettings: res.data.settings, redirect: false }});
    }
    catch (err) {
        dispatch(errorHandler(err));
    }
}

export const updateUserSettings = (cookieChoice) => async dispatch => {
    try {
        await axios.post("/api/update-user-settings", { cookieChoice });

        dispatch({ type: UPDATE_SETTINGS_SUCCESS, payload: { redirect: true } });
    }
    catch (err) {
        dispatch(errorHandler(err));
    }
}