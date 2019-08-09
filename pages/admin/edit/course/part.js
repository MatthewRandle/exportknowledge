import React from "react";

import { isAdmin } from "../../../../components/admin/AdminActions";
import initialSetupFetch from "../../../../utils/initialSetupFetch";
import EditCoursePart from "../../../../components/admin/editCourse/editCoursePart";

const EditCoursePartPage = (props) => {
    return (
        <EditCoursePart />
    )
}

EditCoursePartPage.getInitialProps = async function ({ store, req, query }) {
    await initialSetupFetch(store, req);
    await store.dispatch(isAdmin(req));

    const state = store.getState();

    if (state.admin) {
        if (state.admin.authorised) {
            return {};
        }
    }

    res.writeHead(301, {
        Location: "/"
    })
    res.end();
}

export default EditCoursePartPage;