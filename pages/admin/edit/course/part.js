import React from "react";

import initialSetupFetch from "../../../../utils/initialSetupFetch";
import EditCoursePart from "../../../../components/admin/editCourse/editCoursePart";

const EditCoursePartPage = (props) => {
    return (
        <EditCoursePart />
    )
}

EditCoursePartPage.getInitialProps = async function ({ store, req, query }) {
    await initialSetupFetch(store, req);
    
    return { };
}

export default EditCoursePartPage;