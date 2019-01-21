import axios from "axios";

import errorHandler from "../../utils/actionErrorHandler";
import getRouteString from "../../utils/getRouteString";

export const GET_USER_SETTINGS = "GET_USER_SETTINGS";
export const UPDATE_SETTINGS_SUCCESS = "UPDATE_SETTINGS_SUCCESS";
export const DELETE_ACCOUNT_FAILURE = "DELETE_ACCOUNT_FAILURE";

export const getUserSettings = (req) => async dispatch => {
    try {
        const res = await axios.post(getRouteString("/api/get-user-settings", req), { user: req ? req.user : null });

        dispatch({ type: GET_USER_SETTINGS, payload: { userSettings: res.data.settings, redirect: false }});
    }
    catch (err) {
        dispatch(errorHandler(err));
    }
}

export const updateUserSettings = (cookieChoice, router) => async dispatch => {
    try {
        await axios.post("/api/update-user-settings", { cookieChoice });

        router.push("/");
    }
    catch (err) {
        dispatch(errorHandler(err));
    }
}

export const deleteAccount = (router) => async dispatch => {
    try {
        const res = await axios.get("/api/delete-account");

        if(res.data.success === true ){
            router.push("/api/logout");
        }
        else {
            dispatch({ type: DELETE_ACCOUNT_FAILURE });            
        }
    }
    catch(err) {
        dispatch(errorHandler(err));
    }
}