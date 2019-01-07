import { combineReducers } from "redux";
import userReducer from "./userReducer";
import userMenuReducer from "../components/userMenu/UserMenuReducer";
import errorReducer from "./errorReducer";
import courseReducer from "../components/course/CourseReducer";
import articleReducer from "../components/article/ArticleReducer";
import commentReducer from "../components/comment/CommentReducer";
import adminReducer from "../components/admin/AdminReducer";
import settingsReducer from "../components/settings/SettingReducer";
import howManyHoursReducer from "../components/howmanyhours/HowManyHoursReducer";

export default combineReducers({
    user: userReducer,
    userMenu: userMenuReducer,
    error: errorReducer,
    course: courseReducer,
    article: articleReducer,
    comment: commentReducer,
    admin: adminReducer,
    settings: settingsReducer,
    statistics: howManyHoursReducer
});