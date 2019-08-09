import Link from "next/link";

import "../../stylesheets/css/CoursePanel.css";

import initialSetupFetch from "../../utils/initialSetupFetch";
import { isAdmin } from "../../components/admin/AdminActions";

const AdminPage = () => {
    return(
        <div className="pushFooter" style={{ marginTop: "100px" }}> 
            <Link href="/admin/courses">
                <a>Courses</a>
            </Link>

            <Link href="/admin/articles">
                <a>Articles</a>
            </Link>
        </div>
    )
}

AdminPage.getInitialProps = async function ({ store, req, res, query }) {
    await initialSetupFetch(store, req);
    await store.dispatch(isAdmin(req));
    const state = store.getState();

    if(state.admin) {
        if(state.admin.authorised) {
            return {};
        }
    }

    res.writeHead(301, {
        Location: "/"
    })
    res.end();
}

export default AdminPage;