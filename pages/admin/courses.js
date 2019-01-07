import React from "react";

import { reset, fetchAllCourses } from "../../components/admin/AdminActions";
import initialSetupFetch from "../../utils/initialSetupFetch";
import Admin from "../../components/admin";

const AdminCoursesPage = () => {
    return (
        <Admin />
    )
}

AdminCoursesPage.getInitialProps = async function ({ store, req }) {
    await initialSetupFetch(store, req);

    await store.dispatch(fetchAllCourses(req));
    await store.dispatch(reset());

    return {};
}

export default AdminCoursesPage;