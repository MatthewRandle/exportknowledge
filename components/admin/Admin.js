import React from "react";
import Link from "next/link";

import "../../stylesheets/css/Admin.css";

const Admin = (props) => {   
    return (
        <div className="admin_container pushFooter">
            <ul className="admin_list">
                <li><Link href="/admin"><a>Dashboard</a></Link></li>
                <li><Link href="/admin/courses"><a>Courses</a></Link></li>
                <li><Link href="/admin/articles"><a>Articles</a></Link></li>
            </ul>

            <div className={props.articles ? "admin_data--articles" : "admin_data--courses"}>
                {props.data}
            </div>
        </div>
    );                
};

export default Admin;