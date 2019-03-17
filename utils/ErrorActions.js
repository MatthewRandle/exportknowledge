import { CLEAR_ERROR } from "./actions";

export const clearError = () => dispatch => {
    dispatch({ type: CLEAR_ERROR });
    return;
};