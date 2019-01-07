import React from "react";

import initialSetupFetch from "../../../../utils/initialSetupFetch";
import NewCoursePart from "../../../../components/admin/newCourse/newCoursePart";

const NewCoursePartPage = () => {
    return (
        <NewCoursePart />
    )
}

NewCoursePartPage.getInitialProps = async function ({ store, req }) {
    await initialSetupFetch(store, req);

    return {};
}

export default NewCoursePartPage;