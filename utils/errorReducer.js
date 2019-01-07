import { ERROR, CLEAR_ERROR, NOT_FOUND, TOO_MANY_REQUESTS } from "./actions";

export default function (state = null, action) {
    switch (action.type) {
        case ERROR:
            return { ...state, ...action.payload };
        case CLEAR_ERROR:
            return null;
        default:
            return state;
    }
}