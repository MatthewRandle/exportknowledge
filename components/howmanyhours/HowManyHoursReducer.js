import { FETCH_STATISTICS, CLEAR_STATISTICS, SET_STATUS } from "./HowManyHoursActions";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_STATISTICS:
            return { ...state, ...action.payload };
        case SET_STATUS:
            return { ...state, ...action.payload };
        case CLEAR_STATISTICS:
            return null;
        default:
            return state;
    }
}