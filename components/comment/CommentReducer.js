import { COMMENT_SUCCESS, COMMENT_FAILURE, DELETE_COMMENT_FAILURE, DELETE_COMMENT_SUCCESS, CLEAR_COMMENT  } from "./CommentActions";

export default function (state = null, action) {
    switch (action.type) {
        case COMMENT_SUCCESS:
            return { ...state, ...action.payload };
        case COMMENT_FAILURE:
            return { ...state, ...action.payload };
        case DELETE_COMMENT_FAILURE:
            return { ...state, ...action.payload };
        case DELETE_COMMENT_SUCCESS:
            return { ...state, ...action.payload };
        case CLEAR_COMMENT:
            return null;
        default:
            return state;
    }
}