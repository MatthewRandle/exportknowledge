const ERROR = "ERROR";

const errorHandler = (err) => dispatch => {
    if (err.response != null) {
        if (err.response.status != null) {
            if (err.response.status === 404) {
                dispatch({ type: ERROR, payload: { code: 404, customMessage: "What you are looking for has either moved or never existed. Try going back and searching again." } });
                return;
            }
            else if (err.response.status === 429) {
                dispatch({ type: ERROR, payload: { code: 429, customMessage: "You have performed too many requests recently. Wait a few minutes and try again." } });
                return;
            }
            else if (err.response.status === 400) {
                dispatch({ type: ERROR, payload: { code: 400, customMessage: "Try going back to where you came from." } });
                return;
            }
            else if (err.response.status === 500) {
                dispatch({ type: ERROR, payload: { code: 500, customMessage: null } });
                return;
            }
        }
    }
    
    dispatch({ type: ERROR, payload: { code: 520, customMessage: null } });
    return;
};

export default errorHandler;