import React from "react";

import "../../../../stylesheets/css/CoursePartPanel.css";

import { isAdmin } from "../../../../components/admin/AdminActions";
import initialSetupFetch from "../../../../utils/initialSetupFetch";
import EditCourse from "../../../../components/admin/editCourse";

const EditCoursePage = () => {
    return (
        <EditCourse />
    )
}

EditCoursePage.getInitialProps = async function ({ store, req }) {
    await initialSetupFetch(store, req);
    await store.dispatch(isAdmin(req));

    const state = store.getState();

    if (state.admin) {
        if (state.admin.authorised) {
            return {  };
        }
    }

    res.writeHead(301, {
        Location: "/"
    })
    res.end();
}

export default EditCoursePage;