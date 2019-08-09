import axios from "axios";
import getRouteString from "../../utils/getRouteString";

import errorHandler from "../../utils/actionErrorHandler";

export const FETCH_ALL_COURSES = "FETCH_ALL_COURSES";
export const FETCH_COURSE = "FETCH_COURSE";
export const CLEAR_COURSE = "CLEAR_COURSE";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_COURSE_PART = "FETCH_COURSE_PART";
export const FETCH_LATEST_COURSES = "FETCH_LATEST_COURSES";

export const fetchCourse = (url, req) => async dispatch => {
    try {
        const res = await axios.post(getRouteString("/api/get-course", req), { url });

        dispatch({ type: FETCH_COURSE, payload: { selectedCourse: res.data.course, selectedCourseParts: res.data.parts } })
    }
    catch (err) {
        dispatch(errorHandler(err));
    }
};

export const fetchCoursePart = (part, course, req) => async dispatch => {
    try {
        const res = await axios.post(getRouteString("/api/get-course-part", req), { part, course });

        //Add courses ID to the selectedPart object
        let selectedPart = res.data.part;
        selectedPart = { ...selectedPart, ...{ courseID: res.data.courseID } };

        dispatch({ type: FETCH_COURSE_PART, payload: { selectedPart } });
    }
    catch(err) {
        dispatch(errorHandler(err));
    }
};

export const clearCoursePart = () => dispatch => {
    dispatch({ type: FETCH_COURSE_PART, payload: { selectedPart: null } });
};

export const fetchAllCourses = (req) => async dispatch => {
    try {
        const res = await axios.get(getRouteString("/api/get-all-courses", req));

        dispatch({ type: FETCH_ALL_COURSES, payload: { all: res.data.courses } });
    }
    catch(err) {
        dispatch(errorHandler(err));
    }
};

export const fetchCategories = () => async dispatch => {
    try {
        const res = await axios.get("/api/get-categories");

        dispatch({ type: FETCH_CATEGORIES, payload: { categories: res.data.categories } });
    }
    catch(err) {
        dispatch(errorHandler(err));
    }
};

export const fetchLatestCourse = (req) => async dispatch => {
    try {
        const res = await axios.get(getRouteString("/api/get-latest-courses", req));

        dispatch({ type: FETCH_LATEST_COURSES, payload: { latestCourse: res.data.latest }});
    }
    catch (err) {
        dispatch(errorHandler(err));
    }
};

export const clearCourse = () => dispatch => {
    dispatch({ type: CLEAR_COURSE });
};