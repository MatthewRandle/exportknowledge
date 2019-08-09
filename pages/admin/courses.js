import { useSelector } from "react-redux";
import { withRouter } from "next/router";

import { reset, fetchAllCourses, isAdmin } from "../../components/admin/AdminActions";
import initialSetupFetch from "../../utils/initialSetupFetch";
import CoursePanel from "../../components/coursePanel";

import "../../stylesheets/css/CoursePanel.css";
import "../../stylesheets/css/Courses.css";

const AdminCoursesPage = ({ router }) => {
    const courses = useSelector(state => state.admin.allCourses);

    if(courses) {
        return (
            <div className="courses_container pushFooter">
                <div className="courses" style={{ marginTop: "100px" }}>
                    <div className="admin_new" onClick={() => router.push("/admin/new/course")}>+</div>

                    {courses.map((item, i) => {
                        return <CoursePanel
                            title={item.title}
                            image={item.image}
                            exists={item.exists}
                            key={i}
                            timestamp={item.timestamp}
                            length={item.length}
                            onAdminPage={true}
                            url={`/admin/edit/course/${item.url}`}
                        />
                    })}
                </div>
            </div>
        )
    }
    else {
        <div className="pushFooter" style={{ marginTop: "100px" }}>
            Could Not Load Courses
        </div>
    }    
}

AdminCoursesPage.getInitialProps = async function ({ store, req }) {
    await initialSetupFetch(store, req);
    await store.dispatch(isAdmin(req));

    const state = store.getState();

    if (state.admin) {
        if (state.admin.authorised) {
            await store.dispatch(fetchAllCourses(req));
            await store.dispatch(reset());

            return {};           
        }
    }

    res.writeHead(301, {
        Location: "/"
    })
    res.end();
}

export default withRouter(AdminCoursesPage);