import axios from "axios";
import keys from "../../config/keys";

let ids, rejected;

export async function getMovieIDs(movies) {
    try {
        ids = new Array(0);
        rejected = new Array(0);

        await repeat(movies);

        return { ids, rejected };
    } catch (error) {
        console.log("ERROR in getmoveids: " + error.message);        
    }
}

function repeat(movies) {
    return new Promise(resolve => {
        let interval = setInterval(async function() {
            await makeCalls(movies);

            if (movies.length === 0) {
                clearInterval(interval);
                resolve();
            }
        }, 1.5 * 1000);
    })
}

async function makeCalls(movies) {
    try {
        let amountOfCalls;

        if (movies.length > 4) {
            amountOfCalls = 4;
        }
        else {
            amountOfCalls = movies.length;
        }

        for (let i = 1; i <= amountOfCalls; i++) {
            let query = encodeURI(movies[0][0]); //movie format [name, amountWatched, date]

            let res = await axios.get("https://api.themoviedb.org/3/search/movie?api_key=" + keys.TMDBKey + "&language=en-US&query=" + query + "&page=1&include_adult=false");

            //If we found a movie
            if (res.data.results.length > 0) {
                ids.push([res.data.results[0].id, movies[0][1], movies[0][0]]); //[runtime, amount of times watched, name]

                //Get rid of this element
                movies.splice(0, 1);
            }
            //we didnt find a movie so push to rejected
            else {                 
                rejected.push(movies[0][0]);                
                
                movies.splice(0, 1);
            }            
        }
    } catch(error) {
        throw new Error(error.message);
    }
}