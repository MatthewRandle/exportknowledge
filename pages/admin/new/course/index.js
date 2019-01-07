import React from "react";

import initialSetupFetch from "../../../../utils/initialSetupFetch";
import NewCourse from "../../../../components/admin/newCourse";

const NewCoursePage = () => {
    return (
        <NewCourse />
    )
}

NewCoursePage.getInitialProps = async function ({ store, req }) {
    await initialSetupFetch(store, req);

    return {};
}

export default NewCoursePage;