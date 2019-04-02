import axios from "axios";
import getRouteString from "../utils/getRouteString";
import { checkUserAllowsCookies } from "../components/cookieCheck/CookieActions";
import { CHECK_USERS_ALLOWS_COOKIES } from "../components/cookieCheck/CookieActions";
import { isAdmin } from "../components/admin/AdminActions";

export default async function initialSetupFetch (store, req) {
    //only do this once per mount, i.e. server side
    if(req) {
        if(req.user != null) {
            store.dispatch({ type: "FETCH_USER", payload: { id: req.user } });
            store.dispatch(isAdmin(req));

            const userIconRes = await axios.post(getRouteString("/api/get-user-icon", req), { user: req.user })
                .catch(err => {
                    console.log("Could not get user icon.");
                    console.log(err);
                });

            store.dispatch({ type: "FETCH_USER_ICON", payload: { userIcon: userIconRes.data.icon } });
            await store.dispatch(checkUserAllowsCookies(req));
            return;
        }
    }
}