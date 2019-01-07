export const FETCH_USER_ICON = "FETCH_USER_ICON";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER_ICON:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}