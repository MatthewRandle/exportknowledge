import { FETCH_ALL_COURSES, CLEAR_COURSE, FETCH_COURSE, FETCH_CATEGORIES, FETCH_COURSE_PART, FETCH_LATEST_COURSES } from "./CourseActions";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_ALL_COURSES:
            return { ...state, ...action.payload };
        case FETCH_COURSE:
            return { ...state, ...action.payload };
        case FETCH_CATEGORIES: 
            return { ...state, ...action.payload };
        case FETCH_COURSE_PART:
            return { ...state, ...action.payload };
        case FETCH_LATEST_COURSES:
            return { ...state, ...action.payload };
        case CLEAR_COURSE:
            return { ...state, ...{ selectedCourse: null, selectedCourseParts: null } };
        default:
            return state;
    }
}