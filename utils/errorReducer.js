import { CLEAR_ERROR } from "./actions";
import { databaseError, fatalError } from "./errorTypes";

export default function (state = null, action) {
    switch (action.type) {
        case fatalError:
            return { ...state, fatalError: { ...action.payload } };
        case CLEAR_ERROR:
            return null;
        case databaseError: 
            return { ...state, databaseError: { ...action.payload } };
        default:
            return state;
    }
}