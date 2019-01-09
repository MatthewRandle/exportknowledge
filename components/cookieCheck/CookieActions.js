import axios from "axios";
import getRouteString from "../../utils/getRouteString";

export const CHECK_USERS_ALLOWS_COOKIES = "CHECK_USERS_ALLOWS_COOKIES";

export const checkUserAllowsCookies = (req) => async dispatch => {    
    const res = await axios.post(getRouteString("/api/check-user-allows-cookies", req), { oauthID: req.user });    

    if (res.data.error || res.data.allowsCookies === -1) {
        dispatch({ type: CHECK_USERS_ALLOWS_COOKIES, payload: { userAllowsCookies: "unknown" } });
        return;
    }
    else if(res.data.allowsCookies === 0) {
        dispatch({ type: CHECK_USERS_ALLOWS_COOKIES, payload: { userAllowsCookies: false } });
        return;
    }
    else if (res.data.allowsCookies === 1) {
        dispatch({ type: CHECK_USERS_ALLOWS_COOKIES, payload: { userAllowsCookies: true } });
        return;
    }
};

export const setCookieChoice = (choice) => async dispatch => {
    await axios.post("/api/set-cookie-choice", { choice });
};