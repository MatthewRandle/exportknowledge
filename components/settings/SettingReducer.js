import { GET_USER_SETTINGS, UPDATE_SETTINGS_SUCCESS } from "./SettingsActions";

export default function (state = null, action) {
    switch (action.type) {
        case GET_USER_SETTINGS:
            return { ...state, ...action.payload };
        case UPDATE_SETTINGS_SUCCESS:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}