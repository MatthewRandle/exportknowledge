import axios from "axios";
import getRouteString from "../utils/getRouteString";

export default async function initialSetupFetch (store, req) {
    //only do this once per mount, i.e. server side
    if(req) {
        const userRes = await axios.post(getRouteString("/api/current_user", req), { user: req ? req.user : null })
            .catch(err => {
                console.log("Could not check if user is signed in.");
                console.log(err);
            });        

        if(userRes.data != null) {
            //load user into user state
            store.dispatch({ type: "FETCH_USER", payload: userRes.data });

            //if the user is logged in get profile picture
            if (userRes.data.id !== false || null) {
                const userIconRes = await axios.post(getRouteString("/api/get-user-icon", req), { user: userRes.data.id })
                    .catch(err => {
                        console.log("Could not get user icon.");
                        console.log(err);
                    });

                store.dispatch({ type: "FETCH_USER_ICON", payload: { userIcon: userIconRes.data.icon } });
            }
        }
    }
}