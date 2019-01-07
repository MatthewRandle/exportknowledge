var axios = require("axios");
import keys from "../../config/keys";

let rejected, stats; //TODO: handle rejcted tv shows and display them

export async function getTVShowStats(ids) {
    try {
        rejected = new Array(0);
        stats = new Array(0);

        await repeat(ids);

        return { stats, rejected };
    } catch (error) {
        console.log("ERROR in gettvstats: " + error.message);
    }
}

function repeat(ids) {
    return new Promise(resolve => {
        let interval = setInterval(async function () {
            await makeCalls(ids);

            if (ids.length === 0) {
                clearInterval(interval);
                resolve();
            }
        }, 1.5 * 1000);
    })
}

async function makeCalls(ids) {
    try {
        let amountOfCalls;

        if (ids.length > 4) {
            amountOfCalls = 4;
        }
        else {
            amountOfCalls = ids.length;
        }

        for (let i = 1; i <= amountOfCalls; i++) {
            let id = ids[0][0];

            let res = await axios.get("https://api.themoviedb.org/3/tv/" + id + "?api_key=" + keys.TMDBKey + "&language=en-US");
            let runtime = res.data.episode_run_time[0];

            //if we got the runtime
            if (runtime > 0) {
                stats.push([runtime, ids[0][1], ids[0][2]]); //[runtime, amount of watches, name]
            }
            else {
                stats.push([45, ids[0][1], ids[0][2]]); //[runtime, amount of watches, name]
            }

            //Get rid of this element
            ids.splice(0, 1);
        }
    } catch (error) {
        throw new Error(error.message);
    }
}