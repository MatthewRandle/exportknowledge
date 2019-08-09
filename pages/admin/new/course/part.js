import React from "react";

import { isAdmin } from "../../../../components/admin/AdminActions";
import initialSetupFetch from "../../../../utils/initialSetupFetch";
import NewCoursePart from "../../../../components/admin/newCourse/newCoursePart";

const NewCoursePartPage = () => {
    return (
        <NewCoursePart />
    )
}

NewCoursePartPage.getInitialProps = async function ({ store, req }) {
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

export default NewCoursePartPage;