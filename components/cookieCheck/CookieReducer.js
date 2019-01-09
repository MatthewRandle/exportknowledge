import { CHECK_USERS_ALLOWS_COOKIES } from "./CookieActions";

export default function (state = null, action) {
    switch (action.type) {
        case CHECK_USERS_ALLOWS_COOKIES:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}