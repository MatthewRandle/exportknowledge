import React from "react";

import initialSetupFetch from "../../../../utils/initialSetupFetch";
import EditCourse from "../../../../components/admin/editCourse";

const EditCoursePage = () => {
    return (
        <EditCourse />
    )
}

EditCoursePage.getInitialProps = async function ({ store, req }) {
    await initialSetupFetch(store, req);

    return { };
}

export default EditCoursePage;