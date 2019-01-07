var axios = require("axios");
import keys from "../../config/keys";

let ids, rejected;

export async function getTVShowIDs(tvShows) {
    try {
        ids = new Array(0);
        rejected = new Array(0);

        await repeat(tvShows);

        return { ids, rejected };
    } catch (error) {
        console.log("ERROR in gettvids: " + error.message);
    }
}

function repeat(tvShows) {
    return new Promise(resolve => {
        let interval = setInterval(async function () {
            await makeCalls(tvShows);

            if (tvShows.length === 0) {
                clearInterval(interval);
                resolve();
            }
        }, 1.5 * 1000);
    })
}

async function makeCalls(tvshows) {
    try {
        let amountOfCalls;

        if (tvshows.length > 4) {
            amountOfCalls = 4;
        }
        else {
            amountOfCalls = tvshows.length;
        }

        for (let i = 1; i <= amountOfCalls; i++) {
            let query = encodeURI(tvshows[0][0]);

            let res = await axios.get("https://api.themoviedb.org/3/search/tv?api_key=" + keys.TMDBKey + "&language=en-US&query=" + query + "&page=1");

            //If we found a tvshow
            if (res.data.results.length > 0) {
                ids.push([res.data.results[0].id, tvshows[0][1], tvshows[0][0]]); //[tvID, amount of times watched, name]
            }
            //we didnt find a tvshow so push to rejected
            else {
                rejected.push(tvshows[0]);
            }

            //Get rid of this element
            tvshows.splice(0, 1);
        }
    } catch(error) {
        throw new Error(error.message);
    }
}